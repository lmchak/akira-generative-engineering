import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from 'lucide-react';

const MobileHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen, theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <Menu className="h-6 w-6" />
      </Button>
      <Link to="/profile" className="text-2xl text-blue-600 dark:text-blue-400">
        <span>Generative Engineering</span>
      </Link>
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </header>
  );
};

export default MobileHeader;