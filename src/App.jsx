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
import Design from './pages/Design'
import Mep from './pages/Mep'
import Construction from './pages/Construction'
import Commissioning from './pages/Commissioning'
import ConceptDesign from './pages/ConceptDesign'
import KnowledgeManagement from './pages/KnowledgeManagement'
import FacilityManagement from './pages/FacilityManagement'
import OmniChannelCollaboration from './components/OmniChannelCollaboration'
import ProjectManagement from './components/ProjectManagement'
import Map from './components/Map'
import Insights from './components/Insights'
import Analytics from "./components/Analytics"
import SiteSelector from "./components/SiteSelector"
import News from "./components/News"
import About from "./components/About"
import AIConsultant from "./pages/AIConsultant"

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
                <Route path="/design" element={<Design />} />
                <Route path="/mep" element={<Mep />} />
                <Route path="/construction" element={<Construction />} />
                <Route path="/commissioning" element={<Commissioning />} />
                <Route path="/concept-design" element={<ConceptDesign />} />
                <Route path="/knowledge-management" element={<KnowledgeManagement />} />
                <Route path="/facility-management" element={<FacilityManagement />} />
                <Route path="/omni-channel-collaboration" element={<OmniChannelCollaboration />} />
                <Route path="/project-management" element={<ProjectManagement />} />
                <Route path="/map" element={<Map />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/site-selector" element={<SiteSelector />} />
                <Route path="/news" element={<News />} />
                <Route path="/about" element={<About />} />
                <Route path="/ai-consultant" element={<AIConsultant />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </SupabaseAuthProvider>
    </Router>
  </QueryClientProvider>
)

export default App
