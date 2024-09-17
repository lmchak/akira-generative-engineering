import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { RoleBasedAccess } from './RoleBasedAccess';
import { navItems } from '@/nav-items';
import { Sun, Moon } from 'lucide-react';
import { useSupabaseAuth } from '@/integrations/supabase';

const Sidebar = ({ isMobileMenuOpen, closeMobileMenu, theme, setTheme }) => {
  const { logout } = useSupabaseAuth();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Generative Engineering
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        {navItems.map((item, index) => (
          <RoleBasedAccess key={index} allowedRoles={item.roles || ['user']}>
            <Link
              to={item.path}
              className="flex items-center p-2 rounded-lg mb-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={closeMobileMenu}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          </RoleBasedAccess>
        ))}
        <RoleBasedAccess allowedRoles={['admin']}>
          <Link
            to="/user-management"
            className="flex items-center p-2 rounded-lg mb-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            <span className="ml-3">User Management</span>
          </Link>
          <Link
            to="/role-management"
            className="flex items-center p-2 rounded-lg mb-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            <span className="ml-3">Role Management</span>
          </Link>
        </RoleBasedAccess>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button onClick={handleLogout} variant="outline" className="w-full">
          Log out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
