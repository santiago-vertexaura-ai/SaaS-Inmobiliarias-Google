import React, { useState } from 'react';
import { Search, MessageCircle, Plug } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Integrations from './pages/Integrations';
import WhatsApp from './pages/WhatsApp';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] overflow-hidden font-sans">
      
      {/* Navigation */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative flex flex-col">
        {currentView !== 'whatsapp' && (
          <header className="h-16 bg-white/50 backdrop-blur-sm sticky top-0 z-10 border-b border-neutral-200 flex items-center justify-between px-8 flex-shrink-0">
            <h1 className="text-xl font-semibold text-neutral-900 capitalize">{currentView}</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"><Search size={20}/></button>
              <button className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors relative">
                <MessageCircle size={20}/>
                <span className="absolute top-2 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </header>
        )}

        <div className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'leads' && <Leads />}
          {currentView === 'integrations' && <Integrations />}
          {currentView === 'whatsapp' && <WhatsApp />}
          
          {/* Placeholder for other views */}
          {(!['dashboard', 'leads', 'integrations', 'whatsapp'].includes(currentView)) && (
             <div className="flex flex-col items-center justify-center h-full text-neutral-400">
               <Plug size={48} className="mb-4 opacity-20" />
               <p>Esta sección está en construcción para el MVP.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}