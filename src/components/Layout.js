import React, { useState } from 'react';
import { Home, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'In process', path: '/kanban' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`
          flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'w-20' : 'w-56'}
        `}
      >
        {/* Logo and toggle section */}
        <div className="flex items-center justify-between h-16 px-2 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <div className={`
              relative flex items-center justify-center transition-all duration-300 ease-in-out
              ${isSidebarCollapsed ? 'w-12' : 'w-28'}
            `}>
              <img
                src="https://i.ibb.co/VCDK0YR/JUMPSTART-LOGOMARK-BLACKGREEN.png"
                alt="Collapsed Logo"
                className={`w-10 h-auto object-contain transition-all duration-300 ${
                  isSidebarCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-0 absolute'
                }`}
              />
              <img
                src="https://i.ibb.co/bHT11z6/Untitled-design-45.png"
                alt="Expanded Logo"
                className={`w-full h-auto object-contain transition-all duration-300 ${
                  isSidebarCollapsed ? 'opacity-0 scale-0 absolute' : 'opacity-100 scale-100'
                }`}
              />
            </div>
          </div>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 -mr-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
          
        {/* Navigation */}
        <nav className="flex-1 pt-6">
          {sidebarItems.map((item) => (
            <NavItem
              key={item.label}
              to={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              isCollapsed={isSidebarCollapsed}
            />
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-white shadow-lg">
        {children}
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, isActive, isCollapsed, to }) => {
  return (
    <Link
      to={to}
      className={`
        w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'text-black bg-[#6FEEC5] shadow-sm' 
          : 'text-gray-600 hover:text-black hover:bg-gray-100'
        }
      `}
    >
      <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export default Layout;