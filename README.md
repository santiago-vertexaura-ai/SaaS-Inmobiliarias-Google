# 🚀 PropTech SaaS - Guía de Inicio Rápido

Para arrancar el sistema completo, necesitas abrir **3 terminales** y ejecutar los siguientes comandos en orden:

### 1️⃣ Terminal 1: Infraestructura (Docker)
Levanta la API de WhatsApp (Evolution), la base de datos y la caché.
```bash
# En la raíz del proyecto
docker compose up -d
Nota: La API estará disponible en http://localhost:8081.

2️⃣ Terminal 2: Backend (Node.js)
El puente entre tu web y WhatsApp.

Bash

cd backend
npm install  # (Solo la primera vez)
node server.js
Nota: El servidor corre en http://localhost:3002.

3️⃣ Terminal 3: Frontend (React)
La interfaz de usuario.

Bash

cd frontend
npm install  # (Solo la primera vez)
npm run dev