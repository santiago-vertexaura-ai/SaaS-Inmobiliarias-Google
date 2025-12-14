import React from 'react';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: string;
}

const METRICS: MetricData[] = [
  { label: 'Total Leads', value: '1,248', change: '+12.5%', trend: 'up' },
  { label: 'Mensajes Enviados', value: '8,502', change: '+5.2%', trend: 'up' },
  { label: 'Leads Cualificados', value: '432', change: '+8.1%', trend: 'up' },
  { label: 'Tasa Cualificación', value: '34.6%', change: '-2.1%', trend: 'down' },
  { label: 'Inmuebles Activos', value: '24', change: '0%', trend: 'neutral' },
  { label: 'Tasa Conversión', value: '2.8%', change: '+0.4%', trend: 'up' },
];

const MetricCard: React.FC<{ metric: MetricData }> = ({ metric }) => (
  <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <h4 className="text-sm font-medium text-neutral-500">{metric.label}</h4>
      <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
        metric.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 
        metric.trend === 'down' ? 'text-red-700 bg-red-50' : 'text-neutral-600 bg-neutral-100'
      }`}>
        {metric.trend === 'up' ? <TrendingUp size={12} className="mr-1"/> : 
         metric.trend === 'down' ? <TrendingDown size={12} className="mr-1"/> : null}
        {metric.change}
      </span>
    </div>
    <div className="text-2xl font-bold text-neutral-900">{metric.value}</div>
  </div>
);

const EvolutionChart = () => {
  const data = [
    { day: 'L', val: 45 },
    { day: 'M', val: 62 },
    { day: 'X', val: 55 },
    { day: 'J', val: 85 },
    { day: 'V', val: 70 },
    { day: 'S', val: 30 },
    { day: 'D', val: 25 },
  ];
  const max = Math.max(...data.map(d => d.val));

  return (
    <div className="w-full h-64 flex items-end justify-between gap-4 px-4 pb-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
           <div className="relative w-full flex items-end justify-center h-full">
             <div 
               className="w-full max-w-[40px] bg-neutral-900 rounded-t-md transition-all duration-500 hover:bg-neutral-800 relative group-hover:shadow-lg"
               style={{ height: `${(d.val / max) * 100}%` }}
             >
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                 {d.val} leads
               </div>
             </div>
           </div>
           <span className="text-xs font-medium text-neutral-500">{d.day}</span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Dashboard</h2>
          <p className="text-neutral-500 text-sm mt-1">Resumen de actividad y rendimiento del negocio.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-neutral-200">
          {['Día', 'Semana', 'Mes', 'Año'].map((t, i) => (
            <button key={t} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${i === 2 ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {METRICS.map((metric, idx) => (
          <MetricCard key={idx} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-neutral-900">Evolución de Leads (Semanal)</h3>
            <button className="text-neutral-400 hover:text-neutral-600"><MoreHorizontal size={20} /></button>
          </div>
          <EvolutionChart />
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
           <div>
             <h3 className="font-semibold text-neutral-900 mb-2">Embudo de Ventas</h3>
             <p className="text-sm text-neutral-500 mb-6">Conversión por estado actual</p>
             <div className="space-y-5">
               {[
                 {l: 'Nuevo', v: '100%', count: 120, c: 'bg-blue-500'}, 
                 {l: 'Cualificado', v: '75%', count: 90, c: 'bg-purple-500'}, 
                 {l: 'Esperando Doc.', v: '45%', count: 54, c: 'bg-orange-500'}, 
                 {l: 'Validación', v: '20%', count: 24, c: 'bg-emerald-500'},
                 {l: 'No Interesado', v: '10%', count: 12, c: 'bg-neutral-400'}
               ].map((item, i) => (
                 <div key={i}>
                   <div className="flex justify-between text-xs mb-1.5 font-medium">
                     <span className="text-neutral-700">{item.l}</span>
                     <span className="text-neutral-500">{item.count} ({item.v})</span>
                   </div>
                   <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                     <div className={`h-full rounded-full ${item.c}`} style={{ width: item.v }}></div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
           <button className="w-full mt-6 py-2 text-sm text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
             Ver informe detallado
           </button>
        </div>
      </div>
    </div>
  );
}