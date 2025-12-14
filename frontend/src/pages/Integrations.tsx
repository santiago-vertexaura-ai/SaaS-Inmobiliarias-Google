import React, { useState } from 'react';
import { Smartphone, Home, Mail, CheckCircle2 } from 'lucide-react';
import QRModal from '../components/QRModal';

// ... (El componente IntegrationCard se queda igual)
const IntegrationCard = ({ icon: Icon, name, description, connected, onConnect, colorClass }: any) => (
  <div className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-52">
      <div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorClass} bg-opacity-10`}>
          <Icon className={colorClass.replace('bg-', 'text-')} size={20} />
        </div>
        <h3 className="font-semibold text-neutral-900">{name}</h3>
        <p className="text-sm text-neutral-500 mt-1">{description}</p>
      </div>
      <div className="mt-4">
        {connected ? (
          <button className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit"><CheckCircle2 size={16} /><span>Conectado</span></button>
        ) : (
          <button onClick={onConnect} className="text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors w-full sm:w-auto">Conectar</button>
        )}
      </div>
  </div>
);

export default function Integrations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const INSTANCE_NAME = "proptech_support_v1";
  const BACKEND_URL = "http://localhost:3002/api/connect-whatsapp";

  const handleConnectWhatsApp = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setQrCode(null);
    
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instanceName: INSTANCE_NAME })
      });
      
      const data = await response.json();
      
      if (data.connected) {
        setIsConnected(true);
      } else if (data.qrcode) {
        setQrCode(data.qrcode);
      } else {
        // Si no hay QR ni conexión, es un error
        setQrCode(null); 
      }
    } catch (error) {
      console.error("Connection Error:", error);
      setQrCode(null); // No poner URL falsa, dejar null para mostrar error en modal
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-lg font-medium text-neutral-900">Canales de Comunicación</h2>
        <p className="text-neutral-500 text-sm mt-1">Gestiona las conexiones con servicios externos y CRMs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationCard 
          icon={Smartphone} colorClass="bg-green-500 text-green-600" name="WhatsApp Business"
          description="Conecta tu número mediante Evolution API para automatizar respuestas."
          connected={isConnected} onConnect={handleConnectWhatsApp}
        />
        <IntegrationCard icon={Home} colorClass="bg-purple-500 text-purple-600" name="Idealista" description="Sincroniza tu inventario." connected={false} onConnect={() => alert('Próximamente')} />
        <IntegrationCard icon={Mail} colorClass="bg-blue-500 text-blue-600" name="Email Marketing" description="Envía newsletters automáticos." connected={true} onConnect={() => {}} />
      </div>

      <QRModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isLoading={isLoading} qrCode={qrCode} connected={isConnected} />
    </div>
  );
}