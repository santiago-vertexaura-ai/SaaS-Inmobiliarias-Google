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
  Info,
  User,
  Bot,
  ToggleLeft,
  ToggleRight,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';

// --- Types ---
interface Contact {
  id: string;
  name: string;
  avatar?: string;
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
    <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden">
      
      {/* 1. Left Sidebar: Chat List */}
      <div className="w-80 border-r border-neutral-200 flex flex-col bg-white">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Buscar chat..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-neutral-300"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id}
              onClick={() => { setSelectedContact(contact); setAiEnabled(contact.isAiActive); }}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-neutral-50 transition-colors border-b border-neutral-50 ${selectedContact?.id === contact.id ? 'bg-neutral-100' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-medium flex-shrink-0">
                {contact.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-sm font-semibold text-neutral-900 truncate">{contact.name}</h4>
                  <span className="text-xs text-neutral-400 flex-shrink-0">{contact.time}</span>
                </div>
                <p className="text-xs text-neutral-500 truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Middle: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F0F2F5]">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <header className="h-16 px-6 bg-white border-b border-neutral-200 flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-medium">
                    {selectedContact.name.slice(0, 2).toUpperCase()}
                 </div>
                 <div>
                   <h3 className="text-sm font-semibold text-neutral-900">{selectedContact.name}</h3>
                   <p className="text-xs text-neutral-500 flex items-center gap-1">
                     {aiEnabled && <Bot size={12} className="text-purple-600" />}
                     {aiEnabled ? 'AI Respondiendo' : 'En línea'}
                   </p>
                 </div>
              </div>
              <div className="flex items-center gap-4 text-neutral-500">
                <button className="hover:text-neutral-900"><Video size={20} /></button>
                <button className="hover:text-neutral-900"><Phone size={20} /></button>
                <div className="h-4 w-px bg-neutral-200"></div>
                <button className="hover:text-neutral-900"><Search size={20} /></button>
                <button className="hover:text-neutral-900"><MoreVertical size={20} /></button>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50">
              {MOCK_MESSAGES.map(msg => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm text-sm relative group ${
                    msg.isMe ? 'bg-[#D9FDD3] text-neutral-900 rounded-tr-none' : 'bg-white text-neutral-900 rounded-tl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 opacity-70">
                      <span className="text-[10px]">{msg.time}</span>
                      {msg.isMe && <CheckCheck size={14} className="text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-neutral-200">
              <div className="flex items-end gap-3 max-w-4xl mx-auto">
                <button className="p-2 text-neutral-500 hover:text-neutral-900 mb-1"><Smile size={24} /></button>
                <button className="p-2 text-neutral-500 hover:text-neutral-900 mb-1"><Paperclip size={24} /></button>
                <div className="flex-1 bg-neutral-100 rounded-xl px-4 py-2 focus-within:ring-1 focus-within:ring-neutral-300 transition-all">
                  <textarea 
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    placeholder="Escribe un mensaje" 
                    className="w-full bg-transparent border-none focus:outline-none resize-none text-sm max-h-32 py-1"
                    rows={1}
                  />
                </div>
                <button className="p-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors mb-0.5">
                  <Send size={18} className="ml-0.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 bg-[#F0F2F5] border-b-[6px] border-emerald-500">
             <div className="text-center">
               <h2 className="text-xl font-light text-neutral-600 mb-2">WhatsApp Web para PropTech</h2>
               <p className="text-sm">Envía y recibe mensajes sin mantener tu teléfono conectado.</p>
             </div>
          </div>
        )}
      </div>

      {/* 3. Right Sidebar: Contact Info & AI Toggle */}
      {selectedContact && (
        <div className="w-80 bg-white border-l border-neutral-200 flex flex-col overflow-y-auto">
          <div className="p-8 flex flex-col items-center border-b border-neutral-100">
             <div className="w-24 h-24 rounded-full bg-neutral-200 flex items-center justify-center text-3xl text-neutral-500 font-light mb-4">
                {selectedContact.name.slice(0, 2).toUpperCase()}
             </div>
             <h2 className="text-lg font-semibold text-neutral-900">{selectedContact.name}</h2>
             <p className="text-sm text-neutral-500 mt-1">{selectedContact.phone}</p>
          </div>

          <div className="p-6 space-y-6">
            
            {/* AI Toggle Section */}
            <div className="bg-white p-4 rounded-lg border border-neutral-200">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Bot size={16} className="text-neutral-600" />
                   <span className="font-medium text-sm text-neutral-900">Agente IA</span>
                 </div>
                 <button 
                   onClick={toggleAi} 
                   className={`relative w-11 h-6 rounded-full transition-colors ${
                     aiEnabled ? 'bg-neutral-900' : 'bg-neutral-200'
                   }`}
                 >
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                     aiEnabled ? 'translate-x-6' : 'translate-x-1'
                   }`} />
                 </button>
               </div>
               <p className="text-xs text-neutral-500 mt-2">
                 {aiEnabled 
                   ? 'Respuestas automáticas activadas' 
                   : 'Control manual del chat'}
               </p>
            </div>

            {/* Info Sections */}
            <div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Información</h3>
              <div className="space-y-4">
                 <div className="flex gap-3 items-start">
                    <User size={18} className="text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-900">Cliente Particular</p>
                      <p className="text-xs text-neutral-500">Tipo de cliente</p>
                    </div>
                 </div>
                 <div className="flex gap-3 items-start">
                    <MapPin size={18} className="text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-900">{selectedContact.location}</p>
                      <p className="text-xs text-neutral-500">Ubicación interés</p>
                    </div>
                 </div>
                 <div className="flex gap-3 items-start">
                    <Clock size={18} className="text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-900">10:30 AM</p>
                      <p className="text-xs text-neutral-500">Hora local</p>
                    </div>
                 </div>
              </div>
            </div>

             {/* Tags */}
             <div>
               <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Etiquetas</h3>
               <div className="flex flex-wrap gap-2">
                 {selectedContact.tags.map(tag => (
                   <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs font-medium border border-neutral-200">
                     {tag}
                   </span>
                 ))}
                 <button className="px-2 py-1 bg-white border border-dashed border-neutral-300 text-neutral-400 rounded text-xs hover:border-neutral-400 hover:text-neutral-600">
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