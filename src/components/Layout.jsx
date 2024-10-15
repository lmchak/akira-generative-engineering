import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { Sun, Moon, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import Footer from './Footer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import navItems from '../nav-items';

const NavItem = ({ item, location, closeMobileMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="flex items-center w-full p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          {item.icon}
          <span className="ml-3">{item.label}</span>
          {isOpen ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4">
          {item.children.map((child, childIndex) => (
            <Link
              key={childIndex}
              to={child.path}
              className={`flex items-center p-2 rounded-lg mb-1 ${
                location.pathname === child.path
                  ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={closeMobileMenu}
            >
              {child.icon}
              <span className="ml-3">{child.label}</span>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }
  return (
    <Link
      to={item.path}
      className={`flex items-center p-2 rounded-lg mb-1 ${
        location.pathname === item.path
          ? 'bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      onClick={closeMobileMenu}
    >
      {item.icon}
      <span className="ml-3">{item.label}</span>
    </Link>
  );
};

const Layout = () => {
  const { logout, session } = useSupabaseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/profile" className="text-3xl text-blue-600 dark:text-blue-400">
            <img src="/akira.png" alt="Logo" className="h-8 mr-2" /> {/* Adjust the height and margin as needed */}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} location={location} closeMobileMenu={closeMobileMenu} />
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Log out
          </Button>
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/profile" className="text-2xl  text-blue-600 dark:text-blue-400">
            <span>Generative Engineering</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-75">
            <div className="flex flex-col h-full bg-white dark:bg-gray-800 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl">
                  <span>Generative Engineering</span>
                </h2>
                <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex-1">
                {navItems.map((item, index) => (
                  <NavItem key={index} item={item} location={location} closeMobileMenu={closeMobileMenu} />
                ))}
              </nav>
              <Button onClick={handleLogout} variant="outline" className="w-full mt-4">
                Log out
              </Button>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
