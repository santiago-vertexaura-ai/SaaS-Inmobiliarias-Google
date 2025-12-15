import React, { useState } from 'react';
import { HelpCircle, Book, MessageCircle, Video, FileText, Search, ChevronRight, ExternalLink } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: '¿Cómo conecto WhatsApp a la plataforma?',
    answer: 'Ve a Configuración > Integraciones > WhatsApp y sigue el proceso de autenticación con QR. Necesitas tener WhatsApp Business instalado.',
    category: 'Integraciones'
  },
  {
    question: '¿Cómo funciona el agente conversacional?',
    answer: 'El agente IA responde automáticamente a los leads en WhatsApp usando procesamiento de lenguaje natural. Puedes configurar su tono y comportamiento en Configuración > Agentes IA.',
    category: 'IA'
  },
  {
    question: '¿Qué documentos puede validar el sistema?',
    answer: 'El agente validador puede procesar DNI, nóminas, extractos bancarios y contratos laborales usando OCR e IA para verificar autenticidad.',
    category: 'Validación'
  },
  {
    question: '¿Cómo creo una automatización?',
    answer: 'Ve a Configuración > Automatizaciones > Nueva Automatización. Define el disparador (ej: "Nuevo lead") y las acciones (ej: "Enviar mensaje de bienvenida").',
    category: 'Automatizaciones'
  },
  {
    question: '¿Puedo exportar los datos de leads?',
    answer: 'Sí, en la sección Leads puedes exportar a CSV o Excel con todos los datos de contacto, documentos y análisis IA.',
    category: 'Leads'
  },
  {
    question: '¿Cómo invito a mi equipo?',
    answer: 'Ve a Configuración > Equipo > Invitar Miembro. Ingresa el email y selecciona el rol (Admin, Agent o Viewer).',
    category: 'Equipo'
  },
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...Array.from(new Set(FAQ_DATA.map(faq => faq.category)))];

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Centro de Ayuda</h2>
          <p className="text-neutral-500 text-sm mt-1">Encuentra respuestas y recursos para aprovechar al máximo PropTech AI.</p>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="relative max-w-2xl">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input 
          type="text"
          placeholder="Buscar en la ayuda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 shadow-sm"
        />
      </div>

      {/* Recursos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <a href="#" className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
            <Book size={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1">Documentación</h3>
          <p className="text-sm text-neutral-500">Guías completas paso a paso</p>
        </a>

        <a href="#" className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
            <Video size={24} className="text-purple-600" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1">Video Tutoriales</h3>
          <p className="text-sm text-neutral-500">Aprende visualmente</p>
        </a>

        <a href="#" className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
            <MessageCircle size={24} className="text-emerald-600" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1">Chat en Vivo</h3>
          <p className="text-sm text-neutral-500">Soporte instantáneo</p>
        </a>

        <a href="#" className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
            <FileText size={24} className="text-orange-600" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-1">API Docs</h3>
          <p className="text-sm text-neutral-500">Integración técnica</p>
        </a>
      </div>

      {/* Categorías */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Preguntas Frecuentes */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
            <HelpCircle size={20} />
            Preguntas Frecuentes
          </h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, idx) => (
              <details key={idx} className="group">
                <summary className="p-6 cursor-pointer hover:bg-neutral-50 transition-colors list-none">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                          {faq.category}
                        </span>
                      </div>
                      <h4 className="font-medium text-neutral-900">{faq.question}</h4>
                    </div>
                    <ChevronRight size={20} className="text-neutral-400 group-open:rotate-90 transition-transform" />
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))
          ) : (
            <div className="p-12 text-center text-neutral-500">
              <HelpCircle size={48} className="mx-auto mb-3 text-neutral-300" />
              <p>No se encontraron resultados para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Contacto */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-8 text-white">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold mb-2">¿Necesitas más ayuda?</h3>
          <p className="text-neutral-300 mb-6">Nuestro equipo de soporte está disponible de lunes a viernes, 9:00 - 18:00 CET</p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:support@proptech.com" className="flex items-center gap-2 bg-white text-neutral-900 px-5 py-2.5 rounded-lg font-medium hover:bg-neutral-100 transition-colors">
              <MessageCircle size={18} />
              Contactar Soporte
            </a>
            <a href="#" className="flex items-center gap-2 bg-white/10 backdrop-blur text-white px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-colors">
              <ExternalLink size={18} />
              Ver Documentación
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
