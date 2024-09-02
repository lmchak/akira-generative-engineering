import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { Home, Search, CreditCard, HelpCircle, Settings, PlusCircle, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

const Layout = ({ children }) => {
  const { logout } = useSupabaseAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/profile' },
    { icon: <Search className="w-5 h-5" />, label: 'Search', path: '/search' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Subscription', path: '/subscription' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'FAQ', path: '/faq' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/profile" className="text-2xl font-bold text-blue-600 dark:text-blue-400">rUv</Link>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/profile" className="text-2xl font-bold text-blue-600 dark:text-blue-400">rUv</Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        <nav className="flex-1 p-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center p-2 rounded-lg ${
                location.pathname === item.path
                  ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={logout} variant="outline" className="w-full">
            Log out
          </Button>
        </div>
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-75">
          <div className="flex flex-col h-full bg-white dark:bg-gray-800 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg ${
                    location.pathname === item.path
                      ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
            <Button onClick={logout} variant="outline" className="w-full mt-4">
              Log out
            </Button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;