import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SupabaseAuthProvider, useSupabaseAuth } from '@/integrations/supabase'
import { ThemeProvider } from 'next-themes'
import Layout from './components/Layout'
import Index from './pages/Index'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Subscription from './pages/Subscription'
import FAQ from './pages/FAQ'
import Settings from './pages/Settings'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Chat from './pages/Chat'
import GenerativeEngineering from './pages/GenerativeEngineering'

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }) => {
  const auth = useSupabaseAuth();
  if (auth === undefined) {
    return null; // or a loading spinner
  }
  const { session } = auth;
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <SupabaseAuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/generative-engineering" element={<GenerativeEngineering />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </SupabaseAuthProvider>
    </Router>
  </QueryClientProvider>
)

export default App