import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  Calendar, 
  X, 
  Mail, 
  Phone, 
  Home, 
  Clock, 
  FileText,
  Briefcase,
  Users,
  Dog,
  BrainCircuit,
  MapPin,
  Euro
} from 'lucide-react';

type LeadStatus = 'Nuevo' | 'Cualificado' | 'Esperando Documentacion' | 'Validación' | 'No Interesado';

interface Property {
  title: string;
  price: string;
  address: string;
  image: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: LeadStatus;
  score: number;
  lastActivity: string;
  
  // Property Specifics
  propertyInterest: Property;
  
  // Profile Data
  occupation: string;
  familyMembers: number;
  hasPets: boolean;
  petsDetail?: string;
  incomeRange: string;
  comments: string;
  
  // AI Analysis (Brief)
  aiSummary: string;
}

const MOCK_LEADS: Lead[] = [
  { 
    id: '1', name: 'Ana García', email: 'ana.garcia@gmail.com', phone: '+34 612 345 678', date: '2023-10-24', status: 'Nuevo', score: 85, lastActivity: '2h',
    propertyInterest: {
      title: 'Ático Lujo Gran Vía',
      price: '450.000€',
      address: 'Gran Vía 45, Madrid',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=300'
    },
    occupation: 'Abogada', familyMembers: 2, hasPets: false, incomeRange: '60k - 80k', comments: 'Busca zona tranquila, necesita garaje.',
    aiSummary: 'Perfil sólido con ingresos altos y estabilidad laboral. La propiedad encaja en su rango financiero (DTI < 30%). Alta probabilidad de cierre si se confirma plaza de garaje.'
  },
  { 
    id: '2', name: 'Carlos Ruiz', email: 'carlos.ruiz@hotmail.com', phone: '+34 699 887 766', date: '2023-10-23', status: 'Validación', score: 92, lastActivity: '1d',
    propertyInterest: {
      title: 'Chalet Adosado',
      price: '680.000€',
      address: 'Mirasierra, Madrid',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=300'
    },
    occupation: 'Ingeniero Software', familyMembers: 4, hasPets: true, petsDetail: '2 Perros', incomeRange: '> 100k', comments: 'Necesita jardín grande.',
    aiSummary: 'Comprador muy cualificado, urgencia media. El jardín es el factor decisivo. Capacidad económica demostrada para la entrada.'
  },
  { 
    id: '3', name: 'Marta López', email: 'marta.lopez@empresa.com', phone: '+34 600 112 233', date: '2023-10-22', status: 'Esperando Documentacion', score: 60, lastActivity: '3d',
    propertyInterest: {
      title: 'Piso 3 Habitaciones',
      price: '210.000€',
      address: 'Av. América 12, Madrid',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=300'
    },
    occupation: 'Autónoma', familyMembers: 1, hasPets: true, petsDetail: '1 Gato', incomeRange: '30k - 45k', comments: 'Primera vivienda.',
    aiSummary: 'Perfil riesgo medio (Autónoma). Necesita asesoramiento hipotecario. Interés genuino pero dependiente de financiación bancaria al 80%.'
  },
];

const StatusBadge = ({ status }: { status: LeadStatus }) => {
  const styles = {
    'Nuevo': 'bg-blue-50 text-blue-700 border-blue-200',
    'Cualificado': 'bg-purple-50 text-purple-700 border-purple-200',
    'Esperando Documentacion': 'bg-orange-50 text-orange-700 border-orange-200',
    'Validación': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'No Interesado': 'bg-neutral-100 text-neutral-600 border-neutral-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
};

const ScoreIndicator = ({ score }: { score: number }) => {
  let color = 'bg-red-500';
  if (score >= 80) color = 'bg-emerald-500';
  else if (score >= 50) color = 'bg-yellow-500';

  return (
    <div className="flex items-center gap-2">
      <div className="w-full bg-neutral-100 h-1.5 rounded-full w-16 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }}></div>
      </div>
      <span className="text-xs font-medium text-neutral-600">{score}</span>
    </div>
  );
};

const LeadDrawer = ({ lead, onClose }: { lead: Lead | null, onClose: () => void }) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex justify-between items-start bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center text-lg font-medium shadow-sm">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">{lead.name}</h2>
                <p className="text-sm text-neutral-500">ID: #{lead.id}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <StatusBadge status={lead.status} />
              <span className="text-xs text-neutral-500 flex items-center bg-white border border-neutral-200 px-2 py-0.5 rounded-full">
                <Clock size={12} className="mr-1" /> Activo hace {lead.lastActivity}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
          
          {/* AI Summary (Brief) */}
          <section className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
             <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <BrainCircuit size={14} className="text-neutral-500" /> Resumen IA
                </h3>
                <span className="text-sm font-bold text-neutral-900">{lead.score}/100</span>
             </div>
             <p className="text-sm text-neutral-600 leading-relaxed italic">
               "{lead.aiSummary}"
             </p>
          </section>

          {/* Inmueble de Interés (New Card) */}
          <section>
             <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Interés Principal</h3>
             <div className="border border-neutral-200 rounded-xl overflow-hidden flex gap-4 p-4 hover:border-neutral-300 transition-colors cursor-pointer bg-white shadow-sm">
                <img 
                  src={lead.propertyInterest.image} 
                  alt={lead.propertyInterest.title} 
                  className="w-20 h-20 rounded-lg object-cover bg-neutral-100"
                />
                <div className="flex flex-col justify-center">
                   <h4 className="font-semibold text-neutral-900">{lead.propertyInterest.title}</h4>
                   <p className="text-sm font-medium text-neutral-900 flex items-center mt-1">
                      {lead.propertyInterest.price}
                   </p>
                   <p className="text-xs text-neutral-500 flex items-center mt-1">
                      <MapPin size={12} className="mr-1" /> {lead.propertyInterest.address}
                   </p>
                </div>
             </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
             {/* Datos de Contacto */}
             <section>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400"><Mail size={16}/></div>
                  <span className="text-sm text-neutral-700 truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400"><Phone size={16}/></div>
                  <span className="text-sm text-neutral-700">{lead.phone}</span>
                </div>
              </div>
            </section>

            {/* Perfil del Cliente */}
            <section>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Perfil</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400"><Briefcase size={16}/></div>
                  <span className="text-sm text-neutral-700">{lead.occupation}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400"><Euro size={16}/></div>
                  <span className="text-sm text-neutral-700">{lead.incomeRange}</span>
                </div>
              </div>
            </section>
          </div>
          
          <section className="bg-neutral-50 rounded-lg p-4">
             <div className="flex gap-4 text-sm text-neutral-600">
               <div className="flex items-center gap-2">
                 <Users size={16} className="text-neutral-400"/> {lead.familyMembers} Personas
               </div>
               <div className="flex items-center gap-2">
                 <Dog size={16} className="text-neutral-400"/> {lead.hasPets ? 'Mascotas' : 'Sin mascotas'}
               </div>
             </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-200 bg-white flex gap-3">
          <button className="flex-1 bg-neutral-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm">
            Contactar
          </button>
          <button className="px-4 py-2.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
            Editar
          </button>
        </div>

      </div>
    </div>
  );
};

export default function Leads() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Gestión de Leads</h2>
          <p className="text-neutral-500 text-sm mt-1">Administra y realiza seguimiento de tus clientes potenciales.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 shadow-sm">
             <Filter size={16} /> Filtros
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 shadow-sm">
             <User size={16} /> Nuevo Lead
           </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-neutral-200">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, email o teléfono..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900"
          />
        </div>
        <select className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 focus:outline-none">
          <option>Todos los Estados</option>
          <option>Nuevo</option>
          <option>Cualificado</option>
          <option>Esperando Doc.</option>
        </select>
        <select className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-700 focus:outline-none">
          <option>Este Mes</option>
          <option>Mes Pasado</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Inmueble</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_LEADS.map((lead) => (
                <tr key={lead.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600">
                        {lead.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-neutral-900">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-700">{lead.email}</span>
                      <span className="text-xs text-neutral-400">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-neutral-600 gap-2">
                       <Home size={14} className="text-neutral-400"/> <span className="truncate max-w-[150px]">{lead.propertyInterest.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4">
                    <ScoreIndicator score={lead.score} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 px-3 py-1.5 rounded-md transition-colors"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Drawer */}
      <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}