import React, { useState } from 'react';
import { Zap, Plus, Play, Pause, Edit, Trash2, Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface Automation {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused';
  executions: number;
  lastRun: string;
}

const MOCK_AUTOMATIONS: Automation[] = [
  {
    id: '1',
    name: 'Informe Mensual Automático',
    trigger: 'Primer día de cada mes a las 09:00',
    actions: ['Generar informe PDF con métricas del mes', 'Enviar por email a administradores', 'Archivar en carpeta de informes'],
    status: 'active',
    executions: 12,
    lastRun: 'Hace 5d'
  },
  {
    id: '2',
    name: 'Envío Leads a Jurídico',
    trigger: 'Lead validado completamente',
    actions: ['Verificar documentación completa', 'Enviar email con datos del lead', 'Actualizar estado a "En Revisión Legal"'],
    status: 'paused',
    executions: 45,
    lastRun: 'Hace 3d'
  },
];

export default function Automations() {
  const [automations, setAutomations] = useState<Automation[]>(MOCK_AUTOMATIONS);

  const toggleStatus = (id: string) => {
    setAutomations(automations.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' } 
        : auto
    ));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Automatizaciones</h2>
          <p className="text-neutral-500 text-sm mt-1">Configura flujos automáticos para optimizar tu proceso de ventas.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 shadow-sm transition-colors">
          <Plus size={18} />
          Nueva Automatización
        </button>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-neutral-500">Total Automatizaciones</h4>
            <Zap size={18} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">{automations.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-neutral-500">Activas</h4>
            <Play size={18} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            {automations.filter(a => a.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-neutral-500">Ejecuciones (Mes)</h4>
            <CheckCircle2 size={18} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">
            {automations.reduce((sum, a) => sum + a.executions, 0)}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-neutral-500">Tiempo Ahorrado</h4>
            <Clock size={18} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">142h</p>
        </div>
      </div>

      {/* Lista de Automatizaciones */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <h3 className="font-semibold text-neutral-900">Flujos Configurados</h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {automations.map(automation => (
            <div key={automation.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-neutral-900">{automation.name}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      automation.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {automation.status === 'active' ? 'Activa' : 'Requiere Configuración'}
                    </span>
                  </div>
                  
                  {/* Configuración de Email para Jurídico */}
                  {automation.id === '2' && automation.status === 'paused' && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-900 mb-2">⚠️ Configuración requerida</p>
                      <input 
                        type="email" 
                        placeholder="Email del servicio jurídico y de impagos"
                        className="w-full px-3 py-2 border border-amber-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <button className="mt-2 px-3 py-1.5 bg-emerald-600 text-white rounded-md text-xs font-medium hover:bg-emerald-700 transition-colors">
                        Guardar y Activar
                      </button>
                    </div>
                  )}
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-2">
                      <Zap size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-500 uppercase">Disparador</p>
                        <p className="text-sm text-neutral-700">{automation.trigger}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-500 uppercase mb-1">Acciones</p>
                        <ul className="space-y-1">
                          {automation.actions.map((action, idx) => (
                            <li key={idx} className="text-sm text-neutral-700 flex items-center gap-2">
                              <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Calendar size={14} />
                      <span>{automation.executions} ejecuciones</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Clock size={14} />
                      <span>Última: {automation.lastRun}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleStatus(automation.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      automation.status === 'active'
                        ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {automation.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button className="p-2 bg-neutral-50 text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plantillas Sugeridas */}
      <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200 p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Próximamente</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Backup Semanal', desc: 'Copias de seguridad automáticas' },
            { name: 'Alerta Documentos Vencidos', desc: 'Notificar docs por caducar' },
            { name: 'Reporte de Actividad', desc: 'Resumen semanal del equipo' },
          ].map((template, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg border border-neutral-200 opacity-60">
              <h4 className="font-medium text-neutral-900 mb-1">{template.name}</h4>
              <p className="text-sm text-neutral-500 mb-3">{template.desc}</p>
              <span className="text-xs text-neutral-400 font-medium">Próximamente</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
