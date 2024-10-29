import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseAuthProvider, useSupabaseAuth } from '@/integrations/supabase';
import { ThemeProvider } from 'next-themes';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Layout from './components/Layout';

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
import FacilityManagement from './pages/FacilityManagement';
import AssetManagement from './components/facility/AssetManagement';
import CapacityManagement from './components/facility/CapacityManagement';
import EnergyManagement from './components/facility/EnergyManagement';
import EnvironmentalMonitoring from './components/facility/environmental/EnvironmentalMonitoring';
import SecurityManagement from './components/facility/security/SecurityManagement';
import MaintenanceManagement from './components/facility/maintenance/MaintenanceManagement';
import IncidentManagement from './components/facility/incident/IncidentManagement';
import ComplianceManagement from './components/facility/compliance/ComplianceManagement';
import DisasterRecovery from './components/facility/disaster/DisasterRecovery';
import ServiceManagement from './components/facility/service/ServiceManagement';
import SustainabilityManagement from './components/facility/sustainability/SustainabilityManagement';
import OmniChannelCollaboration from './components/OmniChannelCollaboration'
import ProjectManagement from './components/ProjectManagement'
import Map from './components/Map'
import Insights from './components/Insights'
import Analytics from "./components/Analytics"
import SiteSelector from "./components/SiteSelector"
import News from "./components/News"
import About from "./components/About"
import AIConsultant from "./pages/AIConsultant"
import DataCenterDesigner from "./components/data-center-designer"

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { session } = useSupabaseAuth();
  if (session === undefined) {
    return null;
  }
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <React.StrictMode>
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
                  <Route path="/analytics" element={
                    <RoleProtectedRoute requiredRole="admin">
                      <Analytics />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/insights" element={
                    <RoleProtectedRoute requiredRole="admin">
                      <Insights />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/knowledge-management" element={
                    <RoleProtectedRoute requiredRole="moderator">
                      <KnowledgeManagement />
                    </RoleProtectedRoute>
                  } />
                  <Route path="/generative-engineering" element={<GenerativeEngineering />} />
                  <Route path="/design" element={<Design />} />
                  <Route path="/mep" element={<Mep />} />
                  <Route path="/construction" element={<Construction />} />
                  <Route path="/commissioning" element={<Commissioning />} />
                  <Route path="/concept-design" element={<ConceptDesign />} />
                  <Route path="/facility-management" element={<FacilityManagement />} />
                  <Route path="/facility-management/assets" element={<AssetManagement />} />
                  <Route path="/facility-management/capacity" element={<CapacityManagement />} />
                  <Route path="/facility-management/energy" element={<EnergyManagement />} />
                  <Route path="/facility-management/environmental" element={<EnvironmentalMonitoring />} />
                  <Route path="/facility-management/security" element={<SecurityManagement />} />
                  <Route path="/facility-management/maintenance" element={<MaintenanceManagement />} />
                  <Route path="/facility-management/incident" element={<IncidentManagement />} />
                  <Route path="/facility-management/compliance" element={<ComplianceManagement />} />
                  <Route path="/facility-management/disaster-recovery" element={<DisasterRecovery />} />
                  <Route path="/facility-management/service" element={<ServiceManagement />} />
                  <Route path="/sustainability" element={<SustainabilityManagement />} />
                  <Route path="/omni-channel-collaboration" element={<OmniChannelCollaboration />} />
                  <Route path="/project-management" element={<ProjectManagement />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="/site-selector" element={<SiteSelector />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/ai-consultant" element={<AIConsultant />} />
                  <Route path="/data-center-designer" element={<DataCenterDesigner />} />
                </Route>
              </Routes>
            </TooltipProvider>
          </ThemeProvider>
        </SupabaseAuthProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
