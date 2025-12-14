import React from 'react';
import { Loader2, X, CheckCircle2 } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  qrCode: string | null;
  connected: boolean;
}

export default function QRModal({ 
  isOpen, 
  onClose, 
  isLoading, 
  qrCode, 
  connected 
}: QRModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-white">
          <h3 className="font-semibold text-lg text-neutral-900">Conectar WhatsApp</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
          
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-neutral-900" size={48} />
              <p className="text-neutral-500 text-sm">Generando sesión con Evolution API...</p>
            </div>
          ) : connected ? (
             <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-medium text-neutral-900">¡Conexión Exitosa!</h4>
              <p className="text-neutral-500 text-sm">Tu instancia de WhatsApp está sincronizada.</p>
              <button 
                onClick={onClose}
                className="mt-4 text-sm font-medium bg-neutral-900 text-white px-6 py-2 rounded-lg hover:bg-neutral-800"
              >
                Cerrar
              </button>
            </div>
          ) : qrCode ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="bg-white p-2 border border-neutral-200 rounded-xl shadow-sm">
                 <img 
                   src={qrCode.startsWith('data:') ? qrCode : `data:image/png;base64,${qrCode}`} 
                   alt="WhatsApp QR Code" 
                   className="w-64 h-64 object-contain"
                 />
              </div>
              <p className="text-neutral-500 text-sm text-center max-w-xs mt-2">
                Abre WhatsApp en tu teléfono, ve a <span className="font-medium text-neutral-900">Configuración {'>'} Dispositivos Vinculados</span> y escanea el código.
              </p>
            </div>
          ) : (
            <div className="text-center text-red-500">
              <p>No se pudo cargar el código QR.</p>
              <button 
                onClick={onClose} 
                className="mt-4 text-sm underline text-neutral-500 hover:text-neutral-900"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
        
        {/* Footer (Hint) */}
        {!connected && !isLoading && qrCode && (
          <div className="bg-neutral-50 px-6 py-3 text-center border-t border-neutral-100">
            <p className="text-xs text-neutral-400">Powered by Evolution API</p>
          </div>
        )}
      </div>
    </div>
  );
}