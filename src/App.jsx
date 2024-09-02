import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SupabaseAuthProvider, useSupabaseAuth } from '@/integrations/supabase'
import { ThemeProvider } from 'next-themes'
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
import Layout from './components/Layout'

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }) => {
  const { session } = useSupabaseAuth();
  if (!session) {
    return <Navigate to="/" replace />;
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
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Search />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscription"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Subscription />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faq"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <FAQ />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Settings />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </SupabaseAuthProvider>
    </Router>
  </QueryClientProvider>
)

export default App