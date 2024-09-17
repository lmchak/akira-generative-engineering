import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useTheme } from 'next-themes';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import { RoleBasedAccess } from './RoleBasedAccess';

const Layout = () => {
  const { logout, session, loading } = useSupabaseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("Layout mounted, session:", session);
  }, []);

  useEffect(() => {
    console.log("Session or loading state changed:", { session, loading });
    if (!loading && !session) {
      navigate('/login');
    }
  }, [session, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
        handleLogout={handleLogout}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="flex flex-col flex-1">
        <MobileHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          theme={theme}
          setTheme={setTheme}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
