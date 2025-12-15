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
  AlertCircle
} from 'lucide-react';

type LeadStatus = 'Nuevo' | 'Cualificado' | 'Esperando Documentacion' | 'Validación' | 'No Interesado';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: LeadStatus;
  score: number;
  propertyInterest: string;
  lastActivity: string;
  
  // Profile Data
  occupation: string;
  familyMembers: number;
  hasPets: boolean;
  petsDetail?: string;
  incomeRange: string;
  comments: string;
  
  // AI Analysis
  aiSummary: string;
}

const MOCK_LEADS: Lead[] = [
  { 
    id: '1', name: 'Ana García', email: 'ana.garcia@gmail.com', phone: '+34 612 345 678', date: '2023-10-24', status: 'Nuevo', score: 85, propertyInterest: 'Ático en Centro - Calle Alcalá 45, 3º Ext', lastActivity: '2h',
    occupation: 'Abogada', familyMembers: 2, hasPets: false, incomeRange: '60k - 80k', comments: 'Busca zona tranquila, necesita garaje.',
    aiSummary: 'Lead de alta calidad con perfil financiero sólido y estabilidad laboral demostrada. La ocupación como abogada sugiere ingresos regulares que coinciden con el rango de precio del inmueble objetivo. Requiere seguimiento prioritario para concretar visita.'
  },
  { 
    id: '2', name: 'Carlos Ruiz', email: 'carlos.ruiz@hotmail.com', phone: '+34 699 887 766', date: '2023-10-23', status: 'Validación', score: 92, propertyInterest: 'Chalet Mirasierra - Urbanización Los Robles, nº 12', lastActivity: '1d',
    occupation: 'Ingeniero Software', familyMembers: 4, hasPets: true, petsDetail: '2 Perros grandes', incomeRange: '> 100k', comments: 'Necesita jardín grande para los perros.',
    aiSummary: 'Perfil excepcional con score de 92/100. Los ingresos declarados superan ampliamente el precio del inmueble. La necesidad de jardín amplio es un requisito crítico no negociable. Urgencia media, recomendado agilizar documentación para cierre rápido.'
  },
  { 
    id: '3', name: 'Marta López', email: 'marta.lopez@empresa.com', phone: '+34 600 112 233', date: '2023-10-22', status: 'Esperando Documentacion', score: 60, propertyInterest: 'Piso 3 Hab. Zona Sur - Calle Toledo 89, 2º Izq', lastActivity: '3d',
    occupation: 'Autónoma (Diseño)', familyMembers: 1, hasPets: true, petsDetail: '1 Gato', incomeRange: '30k - 45k', comments: 'Primera vivienda. Dudas sobre hipoteca.',
    aiSummary: 'Score moderado debido a incertidumbre en financiación al ser autónoma. Primera vivienda, requiere asesoramiento hipotecario especializado. Potencial de conversión medio-alto si se resuelven dudas financieras. Programar llamada con asesor bancario.'
  },
  { 
    id: '4', name: 'Jorge Buxó', email: 'jorge.buxo@gmail.com', phone: '+34 655 443 322', date: '2023-10-20', status: 'Cualificado', score: 75, propertyInterest: 'Ático Centro - Plaza Mayor 8, Ático C', lastActivity: '5d',
    occupation: 'Funcionario', familyMembers: 3, hasPets: false, incomeRange: '45k - 60k', comments: 'Quiere mudarse en 3 meses.',
    aiSummary: 'Perfil con ingresos estables garantizados por condición de funcionario. El presupuesto está ajustado para la zona centro pero es viable. Plazo de mudanza de 3 meses indica urgencia real. Priorizar negociación de precio para facilitar cierre.'
  },
  { 
    id: '5', name: 'Elena Nito', email: 'elena.nito@outlook.com', phone: '+34 611 222 333', date: '2023-10-18', status: 'No Interesado', score: 20, propertyInterest: 'Estudio Malasaña - Calle Fuencarral 120', lastActivity: '1w',
    occupation: 'Estudiante', familyMembers: 1, hasPets: false, incomeRange: '< 20k', comments: 'Solo alquiler, no compra.',
    aiSummary: 'Cliente descartado para venta. El perfil y presupuesto no corresponden a adquisición de propiedad. Redirigir al departamento de alquileres si la empresa ofrece ese servicio. No requiere seguimiento adicional en este embudo.'
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
        <div className="p-6 border-b border-neutral-100 flex justify-between items-start bg-neutral-50/50">
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* AI Score Analysis */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                  <BrainCircuit size={16} /> Análisis IA
                </h3>
                <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-indigo-100">
                   <span className="text-lg font-bold text-indigo-600">{lead.score}/100</span>
                </div>
             </div>
             <p className="text-sm text-indigo-900 leading-relaxed">
               {lead.aiSummary}
             </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Datos de Contacto */}
             <section>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User size={16} /> Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <Mail size={18} className="text-neutral-400" />
                  <span className="text-sm text-neutral-700 truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <Phone size={18} className="text-neutral-400" />
                  <span className="text-sm text-neutral-700">{lead.phone}</span>
                </div>
              </div>
            </section>

            {/* Perfil del Cliente */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users size={16} /> Perfil Cliente
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <Briefcase size={18} className="text-neutral-400" />
                  <span className="text-sm text-neutral-700">{lead.occupation}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <div className="flex items-center gap-2 text-neutral-500 min-w-[20px]">
                    <Users size={18} className="text-neutral-400" /> 
                  </div>
                  <span className="text-sm text-neutral-700">{lead.familyMembers} Personas</span>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <Dog size={18} className="text-neutral-400" />
                  <span className="text-sm text-neutral-700">
                    {lead.hasPets ? `Sí, ${lead.petsDetail || 'Mascotas'}` : 'Sin mascotas'}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Inmueble de Interés */}
          <section>
             <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Home size={16} /> Inmueble de Interés
            </h3>
            <div className="p-4 border-2 border-neutral-200 rounded-xl bg-white shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home size={24} className="text-neutral-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900 text-base mb-1">{lead.propertyInterest}</p>
                  <p className="text-xs text-neutral-500">Referencia del inmueble consultado</p>
                </div>
              </div>
            </div>
          </section>

          {/* Comentarios Adicionales */}
          <section>
             <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText size={16} /> Comentarios y Requisitos
            </h3>
            <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50">
              <p className="text-sm text-neutral-700 leading-relaxed">"{lead.comments}"</p>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex gap-3">
          <button className="flex-1 bg-neutral-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm">
            Contactar por WhatsApp
          </button>
          <button className="px-4 py-2.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
            Editar Ficha
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
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Registro</th>
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
                       <Calendar size={14} className="text-neutral-400"/> {lead.date}
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