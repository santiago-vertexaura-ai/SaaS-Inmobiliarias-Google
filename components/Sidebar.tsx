import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  MessageCircle, 
  Plug, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false,
  onClick
}: { 
  icon: React.ElementType, 
  label: string, 
  active?: boolean,
  onClick: () => void
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 group
        ${active ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}
      `}
    >
      <Icon size={18} className={active ? 'text-white' : 'text-neutral-400 group-hover:text-white'} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

const SectionTitle = ({ label }: { label: string }) => (
  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-3 mt-6">
    {label}
  </h3>
);

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#111] border-r border-neutral-800 flex flex-col flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm"></div>
          </div>
          <span className="font-bold text-white tracking-tight">PropTech AI</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <SectionTitle label="Negocio" />
        <div className="space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => onNavigate('dashboard')} 
          />
          <SidebarItem 
            icon={Users} 
            label="Leads" 
            active={currentView === 'leads'} 
            onClick={() => onNavigate('leads')} 
          />
          <SidebarItem 
            icon={Building2} 
            label="Inmuebles" 
            active={currentView === 'inmuebles'} 
            onClick={() => onNavigate('inmuebles')} 
          />
          <SidebarItem 
            icon={MessageCircle} 
            label="WhatsApp" 
            active={currentView === 'whatsapp'} 
            onClick={() => onNavigate('whatsapp')} 
          />
        </div>

        <SectionTitle label="Sistema" />
        <div className="space-y-1">
          <SidebarItem 
            icon={Plug} 
            label="Integraciones" 
            active={currentView === 'integrations'} 
            onClick={() => onNavigate('integrations')} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Configuración" 
            active={currentView === 'settings'} 
            onClick={() => onNavigate('settings')} 
          />
          <SidebarItem 
            icon={HelpCircle} 
            label="Ayuda" 
            active={currentView === 'help'} 
            onClick={() => onNavigate('help')} 
          />
        </div>
      </div>

      <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-600 flex items-center justify-center text-xs text-white font-medium">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white font-medium">John Doe</span>
              <span className="text-xs text-neutral-500">Admin</span>
            </div>
          </div>
      </div>
    </aside>
  );
}