import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  UserCircle,
  LogOut,
  X,
  Library,
  Files,
  Users
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const displayName = user.nombres ? `${user.nombres} ${user.ap_paterno || ''}`.trim() : 'Estudiante';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Inicio', path: '/dashboard' },
    { icon: Library, label: 'Libros', path: '/dashboard/books' },
    { icon: Files, label: 'Prácticas', path: '/dashboard/practices' },
    { icon: Users, label: 'Docentes', path: '/dashboard/teachers' },
    { icon: CalendarCheck, label: 'Asistencia', path: '/dashboard/attendance' },
    { icon: UserCircle, label: 'Perfil', path: '/dashboard/profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={toggleSidebar}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-text">CEPRE<span>.</span></span>
          </div>
          <button className="close-btn" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* User Section */}
        <div className="sidebar-user">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{displayName}</div>
            <div className="user-role">Estudiante CEPRE</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  end={item.path === '/dashboard'}
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
