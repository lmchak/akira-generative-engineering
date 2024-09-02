import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SupabaseAuthProvider } from '@/integrations/supabase'
import { ThemeProvider } from 'next-themes'
import Index from './pages/Index'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Subscription from './pages/Subscription'
import FAQ from './pages/FAQ'
import Settings from './pages/Settings'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SupabaseAuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </SupabaseAuthProvider>
  </QueryClientProvider>
)

export default App