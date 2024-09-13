import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { Home, Search, CreditCard, HelpCircle, Settings, PlusCircle, Sun, Moon, Menu, X, MessageCircle, BookOpen, Activity } from 'lucide-react';
import { useTheme } from 'next-themes';
import Footer from './Footer';

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

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/profile' },
    { icon: <Search className="w-5 h-5" />, label: 'Search', path: '/search' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Subscription', path: '/subscription' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'FAQ', path: '/faq' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Generative Engineering', path: '/generative-engineering' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Concept Design', path: '/concept-design' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Design', path: '/design' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'MEP', path: '/mep' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Construction', path: '/construction' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Commissioning', path: '/commissioning' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Chat', path: '/chat' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Knowledge Management', path: '/knowledge-management' },
    { icon: <Activity className="w-5 h-5" />, label: 'Facility Management', path: '/facility-management' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
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
            <span>Generative Engineering</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        <nav className="flex-1 p-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center p-2 rounded-lg mb-1 ${
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
            <span>Generative Engineering</span><span className="js">.js</span>
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
                  <span>Generative Engineering</span><span className="js">.js</span>
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex-1">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg mb-1 ${
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