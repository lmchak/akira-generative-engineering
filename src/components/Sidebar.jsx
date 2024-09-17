import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleBasedAccess } from './RoleBasedAccess';
import { navItems } from '@/nav-items';
import { Sun, Moon } from 'lucide-react';

const Sidebar = ({ isMobileMenuOpen, closeMobileMenu, handleLogout, theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/profile" className="text-3xl text-blue-600 dark:text-blue-400">
          <span>Generative Engineering</span>
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