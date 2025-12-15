import React, { useState } from 'react';
import { Users, Plus, Mail, Phone, Shield, Edit, Trash2, Crown, UserCheck } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'agent' | 'viewer';
  status: 'active' | 'inactive';
  leadsAssigned: number;
  joinDate: string;
}

const MOCK_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@proptech.com',
    phone: '+34 611 222 333',
    role: 'admin',
    status: 'active',
    leadsAssigned: 45,
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria.gonzalez@proptech.com',
    phone: '+34 622 333 444',
    role: 'agent',
    status: 'active',
    leadsAssigned: 32,
    joinDate: '2023-03-20'
  },
  {
    id: '3',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@proptech.com',
    phone: '+34 633 444 555',
    role: 'agent',
    status: 'active',
    leadsAssigned: 28,
    joinDate: '2023-05-10'
  },
  {
    id: '4',
    name: 'Ana Martín',
    email: 'ana.martin@proptech.com',
    phone: '+34 644 555 666',
    role: 'viewer',
    status: 'active',
    leadsAssigned: 0,
    joinDate: '2023-08-01'
  },
];

const RoleBadge = ({ role }: { role: string }) => {
  const styles = {
    admin: 'bg-purple-50 text-purple-700 border-purple-200',
    agent: 'bg-blue-50 text-blue-700 border-blue-200',
    viewer: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  };

  const icons = {
    admin: <Crown size={12} />,
    agent: <UserCheck size={12} />,
    viewer: <Shield size={12} />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[role as keyof typeof styles]}`}>
      {icons[role as keyof typeof icons]}
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>(MOCK_TEAM);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Equipo</h2>
          <p className="text-neutral-500 text-sm mt-1">Gestiona los miembros de tu equipo y sus permisos.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 shadow-sm transition-colors"
        >
          <Plus size={18} />
          Invitar Miembro
        </button>
      </div>

      {/* Estadísticas del Equipo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-neutral-500">Total Miembros</h4>
            <Users size={18} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">{team.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-neutral-500">Agentes Activos</h4>
            <UserCheck size={18} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            {team.filter(m => m.role === 'agent' && m.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-neutral-500">Leads Asignados</h4>
            <Shield size={18} className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">
            {team.reduce((sum, m) => sum + m.leadsAssigned, 0)}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-neutral-500">Promedio/Agente</h4>
            <Crown size={18} className="text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">
            {Math.round(team.reduce((sum, m) => sum + m.leadsAssigned, 0) / team.filter(m => m.role === 'agent').length)}
          </p>
        </div>
      </div>

      {/* Lista de Miembros */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100">
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Miembro</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Leads</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-sm font-medium text-neutral-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{member.name}</p>
                        <p className="text-xs text-neutral-500">Desde {new Date(member.joinDate).toLocaleDateString('es-ES')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-neutral-700">
                        <Mail size={14} className="text-neutral-400" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-700">
                        <Phone size={14} className="text-neutral-400" />
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={member.role} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-neutral-900">{member.leadsAssigned}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                    }`}>
                      {member.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-neutral-50 text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles y Permisos */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Roles y Permisos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={18} className="text-purple-600" />
              <h4 className="font-semibold text-neutral-900">Admin</h4>
            </div>
            <p className="text-sm text-neutral-600">Acceso completo a todas las funciones y configuraciones.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck size={18} className="text-blue-600" />
              <h4 className="font-semibold text-neutral-900">Agent</h4>
            </div>
            <p className="text-sm text-neutral-600">Gestión de leads, conversaciones y documentos.</p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} className="text-neutral-600" />
              <h4 className="font-semibold text-neutral-900">Viewer</h4>
            </div>
            <p className="text-sm text-neutral-600">Solo lectura, sin permisos de edición.</p>
          </div>
        </div>
      </div>

      {/* Modal de Invitación (placeholder) */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowInviteModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Invitar Nuevo Miembro</h3>
            <div className="space-y-4">
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-neutral-300 rounded-lg" />
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
                <option>Seleccionar Rol</option>
                <option>Admin</option>
                <option>Agent</option>
                <option>Viewer</option>
              </select>
              <div className="flex gap-3">
                <button className="flex-1 bg-neutral-900 text-white py-2 rounded-lg hover:bg-neutral-800">Enviar Invitación</button>
                <button onClick={() => setShowInviteModal(false)} className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
