const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3002;

app.use(cors({ origin: '*' }));
app.use(express.json());

const EVO_URL = process.env.EVOLUTION_URL || 'http://localhost:8081';
const EVO_API_KEY = process.env.EVOLUTION_API_KEY || 'mi_super_clave_secreta_123';

const headers = {
    'apikey': EVO_API_KEY,
    'Content-Type': 'application/json'
};

// Función auxiliar para esperar
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.post('/api/connect-whatsapp', async (req, res) => {
    const { instanceName } = req.body;
    console.log(`\n🔌 [Backend] Solicitud de conexión para: ${instanceName}`);

    try {
        // 1. Intentamos CREAR la instancia
        console.log(`   👉 Intentando crear instancia en ${EVO_URL}...`);
        const createRes = await axios.post(`${EVO_URL}/instance/create`, {
            instanceName,
            qrcode: true,
            integration: "WHATSAPP-BAILEYS"
        }, { headers });

        console.log("   ✅ Instancia creada. QR recibido.");
        const base64 = createRes.data.qrcode?.base64 || createRes.data.base64;
        return res.json({ connected: false, qrcode: base64 });

    } catch (error) {
        // Si falla porque ya existe (Error 403 o 400)
        if (error.response?.status === 403 || error.response?.status === 400) {
            console.log("   ⚠️ La instancia ya existe. Intentando reconectar...");
            
            try {
                // 2. Intentamos CONECTAR para obtener el QR
                const connectRes = await axios.get(`${EVO_URL}/instance/connect/${instanceName}`, { headers });
                const base64 = connectRes.data.base64;

                if (base64) {
                    console.log("   ✅ QR recuperado de instancia existente.");
                    return res.json({ connected: false, qrcode: base64 });
                } else if (connectRes.data.instance?.state === 'open') {
                    console.log("   ✅ La instancia ya estaba conectada.");
                    return res.json({ connected: true });
                }

            } catch (connError) {
                console.log("   ❌ Error al conectar. Intentando RESETEAR la instancia...");
                // 3. Si falla conectar, BORRAMOS la instancia para empezar de cero (Opción nuclear)
                try {
                    await axios.delete(`${EVO_URL}/instance/delete/${instanceName}`, { headers });
                    await delay(1000); // Esperar 1 segundo
                    // Reintentamos crear
                    const retryRes = await axios.post(`${EVO_URL}/instance/create`, {
                        instanceName, qrcode: true, integration: "WHATSAPP-BAILEYS"
                    }, { headers });
                    
                    return res.json({ 
                        connected: false, 
                        qrcode: retryRes.data.qrcode?.base64 || retryRes.data.base64 
                    });
                } catch (delError) {
                    console.error("   ❌ FALLO TOTAL:", delError.message);
                }
            }
        }
        
        console.error("   ❌ Error en backend:", error.message);
        res.status(500).json({ error: "No se pudo generar el QR" });
    }
});

app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`));