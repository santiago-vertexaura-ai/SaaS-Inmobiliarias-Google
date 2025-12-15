import React, { useState } from 'react';
import { Bot, MessageSquare, FileCheck, Settings, Save, RotateCcw } from 'lucide-react';

export default function AIAgents() {
  const [conversationalConfig, setConversationalConfig] = useState({
    tone: 'profesional',
    toneNotes: '',
    autoQualify: true,
    occupation: 'trabajador',
    requiredDocs: {
      trabajador: ['dni', 'nomina', 'contrato'],
      autonomo: ['dni', 'declaracion', 'modelo036'],
      empresa: ['cif', 'cuentas', 'escrituras'],
      estudiante: ['dni', 'matricula', 'aval'],
      jubilado: ['dni', 'pension', 'extracto'],
    }
  });

  const [validatorConfig, setValidatorConfig] = useState({
    validationCriteria: ['identidad', 'ingresos', 'solvencia'],
    notifyComplexCases: true,
    minSalary: '1200',
    maxDebtRatio: '40',
    minCreditScore: '650',
    requiredEmploymentMonths: '6',
  });

  const documentOptions = {
    trabajador: [
      { id: 'dni', label: 'DNI/NIE' },
      { id: 'nomina', label: 'Últimas 3 Nóminas' },
      { id: 'contrato', label: 'Contrato Laboral' },
      { id: 'vidaLaboral', label: 'Vida Laboral' },
    ],
    autonomo: [
      { id: 'dni', label: 'DNI/NIE' },
      { id: 'declaracion', label: 'Declaración de la Renta' },
      { id: 'modelo036', label: 'Modelo 036/037' },
      { id: 'modelo130', label: 'Modelo 130 (último trimestre)' },
    ],
    empresa: [
      { id: 'cif', label: 'CIF de la Empresa' },
      { id: 'cuentas', label: 'Cuentas Anuales' },
      { id: 'escrituras', label: 'Escrituras de Constitución' },
      { id: 'iae', label: 'Alta en IAE' },
    ],
    estudiante: [
      { id: 'dni', label: 'DNI/NIE' },
      { id: 'matricula', label: 'Matrícula Universidad' },
      { id: 'aval', label: 'Aval/Garantía Parental' },
      { id: 'dniAvalista', label: 'DNI del Avalista' },
      { id: 'nominaAvalista', label: 'Nómina del Avalista' },
    ],
    jubilado: [
      { id: 'dni', label: 'DNI/NIE' },
      { id: 'pension', label: 'Certificado de Pensión' },
      { id: 'extracto', label: 'Extracto Bancario' },
      { id: 'vidaLaboral', label: 'Vida Laboral (opcional)' },
    ],
  };

  const toggleDoc = (docId: string) => {
    const currentOccupation = conversationalConfig.occupation as keyof typeof conversationalConfig.requiredDocs;
    const currentDocs = conversationalConfig.requiredDocs[currentOccupation];
    const newDocs = currentDocs.includes(docId)
      ? currentDocs.filter(d => d !== docId)
      : [...currentDocs, docId];
    
    setConversationalConfig({
      ...conversationalConfig,
      requiredDocs: {
        ...conversationalConfig.requiredDocs,
        [currentOccupation]: newDocs
      }
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Agentes IA</h2>
          <p className="text-neutral-500 text-sm mt-1">Configura el comportamiento de tus asistentes inteligentes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Agente Conversacional */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 border-b border-neutral-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <MessageSquare size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Agente Conversacional</h3>
                <p className="text-sm text-neutral-600">Gestiona conversaciones con leads</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-700">Activo</span>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Tono de Comunicación</label>
              <select 
                value={conversationalConfig.tone}
                onChange={(e) => setConversationalConfig({...conversationalConfig, tone: e.target.value})}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                <option value="profesional">Profesional</option>
                <option value="amigable">Amigable</option>
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
              </select>
              <textarea
                value={conversationalConfig.toneNotes}
                onChange={(e) => setConversationalConfig({...conversationalConfig, toneNotes: e.target.value})}
                placeholder="Comentarios adicionales sobre el tono (ej: usar emojis, evitar tecnicismos...)"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all mt-2 resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Tipo de Ocupación</label>
              <select 
                value={conversationalConfig.occupation}
                onChange={(e) => setConversationalConfig({...conversationalConfig, occupation: e.target.value})}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                <option value="trabajador">Trabajador por Cuenta Ajena</option>
                <option value="autonomo">Autónomo</option>
                <option value="empresa">Empresa</option>
                <option value="estudiante">Estudiante</option>
                <option value="jubilado">Jubilado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">Documentos Requeridos</label>
              <div className="space-y-2">
                {documentOptions[conversationalConfig.occupation as keyof typeof documentOptions].map(doc => (
                  <label key={doc.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={conversationalConfig.requiredDocs[conversationalConfig.occupation as keyof typeof conversationalConfig.requiredDocs].includes(doc.id)}
                      onChange={() => toggleDoc(doc.id)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-neutral-700">{doc.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-2">Selecciona los documentos que el agente solicitará automáticamente</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-neutral-900">Auto-Cualificación</p>
                <p className="text-xs text-neutral-500">Cualificar leads automáticamente</p>
              </div>
              <button 
                onClick={() => setConversationalConfig({...conversationalConfig, autoQualify: !conversationalConfig.autoQualify})}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  conversationalConfig.autoQualify ? 'bg-purple-600' : 'bg-neutral-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  conversationalConfig.autoQualify ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-sm">
                <Save size={16} />
                Guardar Cambios
              </button>
              <button className="px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Agente Validador */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border-b border-neutral-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <FileCheck size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Agente Validador</h3>
                <p className="text-sm text-neutral-600">Valida documentos automáticamente</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-700">Activo</span>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">Criterios de Validación Financiera</label>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-2">Salario Mínimo Requerido (€/mes)</label>
                  <input 
                    type="number" 
                    value={validatorConfig.minSalary}
                    onChange={(e) => setValidatorConfig({...validatorConfig, minSalary: e.target.value})}
                    placeholder="1200"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-2">Ratio Máximo de Endeudamiento (%)</label>
                  <input 
                    type="number" 
                    value={validatorConfig.maxDebtRatio}
                    onChange={(e) => setValidatorConfig({...validatorConfig, maxDebtRatio: e.target.value})}
                    placeholder="40"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Porcentaje máximo de ingresos destinado a deudas</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-2">Puntuación de Crédito Mínima</label>
                  <input 
                    type="number" 
                    value={validatorConfig.minCreditScore}
                    onChange={(e) => setValidatorConfig({...validatorConfig, minCreditScore: e.target.value})}
                    placeholder="650"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Score mínimo de solvencia (300-850)</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-2">Antigüedad Laboral Mínima (meses)</label>
                  <input 
                    type="number" 
                    value={validatorConfig.requiredEmploymentMonths}
                    onChange={(e) => setValidatorConfig({...validatorConfig, requiredEmploymentMonths: e.target.value})}
                    placeholder="6"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Tiempo mínimo en el empleo actual</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">Criterios de Validación Documental</label>
              <div className="space-y-2">
                {[
                  { id: 'identidad', label: 'Verificación de Identidad', desc: 'Validar DNI/NIE/Pasaporte' },
                  { id: 'ingresos', label: 'Análisis de Ingresos', desc: 'Comprobar capacidad económica' },
                  { id: 'solvencia', label: 'Solvencia Patrimonial', desc: 'Evaluar patrimonio y deudas' },
                  { id: 'laboral', label: 'Situación Laboral', desc: 'Verificar estabilidad laboral' },
                  { id: 'residencia', label: 'Comprobante de Residencia', desc: 'Validar domicilio actual' },
                ].map(criterio => (
                  <label key={criterio.id} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={validatorConfig.validationCriteria.includes(criterio.id)}
                      onChange={(e) => {
                        const newCriteria = e.target.checked 
                          ? [...validatorConfig.validationCriteria, criterio.id]
                          : validatorConfig.validationCriteria.filter(c => c !== criterio.id);
                        setValidatorConfig({...validatorConfig, validationCriteria: newCriteria});
                      }}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500 mt-0.5"
                    />
                    <div>
                      <span className="text-sm font-medium text-neutral-900">{criterio.label}</span>
                      <p className="text-xs text-neutral-500">{criterio.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900 mb-1">Notificar Casos Complejos</p>
                <p className="text-xs text-neutral-600">La IA te avisará cuando detecte documentos con dudas o inconsistencias que requieran revisión manual</p>
              </div>
              <button 
                onClick={() => setValidatorConfig({...validatorConfig, notifyComplexCases: !validatorConfig.notifyComplexCases})}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-3 ${
                  validatorConfig.notifyComplexCases ? 'bg-emerald-600' : 'bg-neutral-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  validatorConfig.notifyComplexCases ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm">
                <Save size={16} />
                Guardar Cambios
              </button>
              <button className="px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
