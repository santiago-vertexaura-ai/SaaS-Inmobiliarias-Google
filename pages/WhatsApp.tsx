import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Paperclip, 
  Send, 
  Smile, 
  CheckCheck, 
  Phone, 
  Video, 
  Bot,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';

// --- Types ---
interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  phone: string;
  tags: string[];
  location: string;
  isAiActive: boolean;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

// --- Mock Data ---
const CONTACTS: Contact[] = [
  { id: '1', name: 'Ana García', lastMessage: 'Sí, me viene bien a las 18:00', time: '10:30', unread: 2, phone: '+34 612 345 678', tags: ['Interesado', 'Ático'], location: 'Madrid, Centro', isAiActive: true },
  { id: '2', name: 'Carlos Ruiz', lastMessage: '¿Tienen disponibilidad mañana?', time: 'Ayer', unread: 0, phone: '+34 699 887 766', tags: ['Nuevo', 'Chalet'], location: 'Mirasierra', isAiActive: false },
  { id: '3', name: 'Marta López', lastMessage: 'Gracias por la información', time: 'Ayer', unread: 0, phone: '+34 600 112 233', tags: ['Validación'], location: 'Pinto', isAiActive: true },
];

const MOCK_MESSAGES: Message[] = [
  { id: '1', text: 'Hola Ana, ¿cómo estás? Soy el asistente virtual de PropTech.', time: '10:00', isMe: true, status: 'read' },
  { id: '2', text: 'Hola, quería información sobre el ático del centro.', time: '10:05', isMe: false, status: 'read' },
  { id: '3', text: '¡Claro! Es un ático de 120m2 con terraza. ¿Te gustaría agendar una visita?', time: '10:06', isMe: true, status: 'read' },
  { id: '4', text: 'Sí, me viene bien a las 18:00', time: '10:30', isMe: false, status: 'read' },
];

export default function WhatsApp() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(CONTACTS[0]);
  const [msgText, setMsgText] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);

  const toggleAi = () => {
    setAiEnabled(!aiEnabled);
    if (selectedContact) {
      selectedContact.isAiActive = !aiEnabled;
    }
  };

  return (
    <div className="flex h-[calc(100vh)] bg-white overflow-hidden font-sans text-neutral-900">
      
      {/* 1. Left Sidebar: Chat List */}
      <div className="w-80 border-r border-neutral-100 flex flex-col bg-white">
        <div className="p-5 border-b border-neutral-100">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-neutral-200 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id}
              onClick={() => { setSelectedContact(contact); setAiEnabled(contact.isAiActive); }}
              className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-neutral-50 last:border-0 ${selectedContact?.id === contact.id ? 'bg-neutral-50' : 'hover:bg-neutral-50/50'}`}
            >
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500 text-sm font-medium flex-shrink-0">
                {contact.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0 mt-0.5">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className={`text-sm ${selectedContact?.id === contact.id ? 'font-semibold' : 'font-medium'} text-neutral-900 truncate`}>{contact.name}</h4>
                  <span className="text-[10px] text-neutral-400 flex-shrink-0">{contact.time}</span>
                </div>
                <p className={`text-xs truncate ${contact.unread > 0 ? 'text-neutral-900 font-medium' : 'text-neutral-500'}`}>{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="w-2 h-2 mt-2 bg-neutral-900 rounded-full flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Middle: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <header className="h-16 px-6 border-b border-neutral-100 flex justify-between items-center bg-white/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs text-neutral-600 font-medium">
                    {selectedContact.name.slice(0, 2).toUpperCase()}
                 </div>
                 <div>
                   <h3 className="text-sm font-medium text-neutral-900">{selectedContact.name}</h3>
                   <div className="flex items-center gap-1.5">
                     <span className={`w-1.5 h-1.5 rounded-full ${aiEnabled ? 'bg-neutral-900 animate-pulse' : 'bg-green-500'}`}></span>
                     <p className="text-[10px] text-neutral-500 uppercase tracking-wide">
                       {aiEnabled ? 'AI ACTIVA' : 'EN LÍNEA'}
                     </p>
                   </div>
                 </div>
              </div>
              <div className="flex items-center gap-6 text-neutral-400">
                <button className="hover:text-neutral-900 transition-colors"><Phone size={18} /></button>
                <button className="hover:text-neutral-900 transition-colors"><Video size={18} /></button>
                <button className="hover:text-neutral-900 transition-colors"><MoreVertical size={18} /></button>
              </div>
            </header>

            {/* Messages - Minimalist Style */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              {MOCK_MESSAGES.map(msg => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[65%] px-5 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.isMe 
                      ? 'bg-neutral-900 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-neutral-100 text-neutral-900 rounded-2xl rounded-tl-sm'
                  }`}>
                    <p>{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${msg.isMe ? 'text-neutral-400' : 'text-neutral-400'}`}>
                      <span className="text-[10px]">{msg.time}</span>
                      {msg.isMe && <CheckCheck size={12} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <div className="flex items-end gap-2 max-w-4xl mx-auto bg-neutral-50 rounded-2xl p-2 border border-neutral-100 focus-within:border-neutral-200 focus-within:bg-white transition-all shadow-sm">
                <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"><Smile size={20} /></button>
                <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"><Paperclip size={20} /></button>
                <textarea 
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder="Escribe un mensaje..." 
                  className="flex-1 bg-transparent border-none focus:outline-none resize-none text-sm max-h-32 py-2.5 placeholder:text-neutral-400"
                  rows={1}
                />
                <button className="p-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors shadow-sm">
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-300">
             <div className="w-16 h-16 mb-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center">
                <Sparkles size={24} className="text-neutral-300" />
             </div>
             <p className="text-sm font-medium">Selecciona un chat para comenzar</p>
          </div>
        )}
      </div>

      {/* 3. Right Sidebar: Contact Info & AI Toggle */}
      {selectedContact && (
        <div className="w-80 bg-white border-l border-neutral-100 flex flex-col overflow-y-auto">
          
          {/* Minimalist AI Switch */}
          <div className="p-6 border-b border-neutral-100">
             <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-600">
                      <Bot size={14} />
                   </div>
                   <span className="font-semibold text-sm text-neutral-900">Agente IA</span>
                 </div>
                 {/* Custom Minimal Toggle */}
                 <button 
                   onClick={toggleAi} 
                   className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${aiEnabled ? 'bg-neutral-900' : 'bg-neutral-200'}`}
                 >
                   <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${aiEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                 </button>
             </div>
             <p className="text-xs text-neutral-500 leading-relaxed">
               {aiEnabled 
                 ? 'El agente responde automáticamente a este lead. Desactívalo para intervenir.' 
                 : 'Control manual. El agente está en pausa.'}
             </p>
          </div>

          <div className="p-6 flex flex-col items-center border-b border-neutral-100">
             <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-2xl text-neutral-500 font-medium mb-3">
                {selectedContact.name.slice(0, 2).toUpperCase()}
             </div>
             <h2 className="text-base font-semibold text-neutral-900">{selectedContact.name}</h2>
             <p className="text-sm text-neutral-500 mt-0.5">{selectedContact.phone}</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">Detalles</h3>
              <div className="space-y-4">
                 <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{selectedContact.location}</p>
                      <p className="text-xs text-neutral-500">Ubicación</p>
                    </div>
                 </div>
                 <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">10:30 AM</p>
                      <p className="text-xs text-neutral-500">Hora local</p>
                    </div>
                 </div>
              </div>
            </div>

             {/* Tags */}
             <div>
               <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Etiquetas</h3>
               <div className="flex flex-wrap gap-2">
                 {selectedContact.tags.map(tag => (
                   <span key={tag} className="px-2.5 py-1 bg-neutral-50 text-neutral-600 rounded-md text-xs font-medium border border-neutral-100">
                     {tag}
                   </span>
                 ))}
                 <button className="px-2.5 py-1 bg-white border border-dashed border-neutral-200 text-neutral-400 rounded-md text-xs hover:border-neutral-300 hover:text-neutral-600 transition-colors">
                   + Añadir
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}