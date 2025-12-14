const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3001; // Running on 3001 to avoid conflict with React (3000)

// Configurar CORS para permitir peticiones desde el Frontend
app.use(cors({
    origin: '*', // En producción, restringir a tu dominio frontend
    methods: ['GET', 'POST', 'OPTIONS']
}));

app.use(express.json());

// Configuración de Evolution API
const EVO_URL = process.env.EVOLUTION_URL || 'http://localhost:8080';
const EVO_API_KEY = process.env.EVOLUTION_API_KEY || 'mi_super_clave_secreta_123';

/**
 * Endpoint: POST /api/connect-whatsapp
 * Crea una instancia o recupera el QR si ya existe.
 */
app.post('/api/connect-whatsapp', async (req, res) => {
    const { instanceName } = req.body;

    if (!instanceName) {
        return res.status(400).json({ error: 'instanceName is required' });
    }

    console.log(`[Backend] Attempting to connect instance: ${instanceName}`);

    const headers = {
        'apikey': EVO_API_KEY,
        'Content-Type': 'application/json'
    };

    try {
        // 1. Intentar crear la instancia
        // Docs: /instance/create
        const createResponse = await axios.post(`${EVO_URL}/instance/create`, {
            instanceName: instanceName,
            qrcode: true,
            integration: "WHATSAPP-BAILEYS"
        }, { headers });

        // Si se crea exitosamente, Evolution devuelve el QR en la respuesta (si qrcode: true)
        console.log('[Backend] Instance created successfully');
        
        // La estructura de respuesta depende de la versión exacta de Evolution, 
        // pero generalmente viene en qrcode.base64 o similar.
        const base64 = createResponse.data.qrcode?.base64 || createResponse.data.base64;
        
        return res.json({
            connected: false,
            qrcode: base64
        });

    } catch (error) {
        // 2. Manejo de Errores: Si la instancia ya existe (403 o 400)
        const status = error.response ? error.response.status : 500;
        
        // Evolution API suele devolver 403 Forbidden o 400 Bad Request si el nombre ya existe
        if (status === 403 || status === 400) {
            console.log(`[Backend] Instance "${instanceName}" already exists. Fetching connection state...`);

            try {
                // Llamamos a /instance/connect/{instanceName} para obtener el QR nuevamente
                const connectResponse = await axios.get(`${EVO_URL}/instance/connect/${instanceName}`, { 
                    headers 
                });

                // Verificamos si ya está conectada o devolvemos el QR
                // createResponse.data suele tener { instance: {...}, base64: "..." }
                const base64 = connectResponse.data.base64;
                
                // Si devuelve base64, es que falta escanear. Si no, quizás ya está conectada.
                // Para simplificar este MVP, asumimos que si no hay base64 y no hay error, está conectado.
                // O podemos consultar el estado de conexión con otro endpoint.
                
                return res.json({
                    connected: !base64, 
                    qrcode: base64
                });

            } catch (connectError) {
                console.error('[Backend] Error fetching existing instance:', connectError.message);
                return res.status(500).json({ error: 'Failed to recover existing instance' });
            }
        }

        console.error('[Backend] Error creating instance:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});