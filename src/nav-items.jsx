import { Bot, Component, Cable, Brain, Brush, Building, Construction, Home, Search, CreditCard, HelpCircle, Settings, MessageCircle, BookOpen, Activity, Users, Briefcase, MapIcon, TrendingUpIcon, MessageSquareIcon, UserIcon, BarChartIcon, CompassIcon, NewspaperIcon, InfoIcon, Cpu, Box, Battery, Gauge, Thermometer, Shield, Wrench, AlertTriangle, CheckSquare, HardDrive, FileCheck, Leaf, LineChart, Award, Recycle } from 'lucide-react';

const navItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/profile' },
  { icon: <Bot className="w-5 h-5" />, label: 'Generative Engineering', path: '/generative-engineering' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Project Management', path: '/project-management' },
  {
    icon: <Component className="w-5 h-5" />,
    label: 'Engineering',
    children: [
      { icon: <Brush className="w-5 h-5" />, label: 'Concept Design', path: '/concept-design' },
      { icon: <Cable className="w-5 h-5" />, label: 'MEP', path: '/mep' },
      { icon: <Construction className="w-5 h-5" />, label: 'Construction', path: '/construction' },
      { icon: <Component className="w-5 h-5" />, label: 'Commissioning', path: '/commissioning' },
      { icon: <Cpu className="w-5 h-5" />, label: 'Data Center Designer', path: '/data-center-designer' },
    ],
  },
  {
    icon: <Building className="w-5 h-5" />,
    label: 'Real Estate',
    children: [
      { icon: <MapIcon className="w-5 h-5" />, label: 'Map', path: '/map' },
      { icon: <BarChartIcon className="w-5 h-5" />, label: 'Analytics', path: '/analytics' },
      { icon: <TrendingUpIcon className="w-5 h-5" />, label: 'Insights', path: '/insights' },
      { icon: <CompassIcon className="w-5 h-5" />, label: 'Site Selector', path: '/site-selector' },
      { icon: <NewspaperIcon className="w-5 h-5" />, label: 'News', path: '/news' },
      { icon: <Brain className="w-5 h-5" />, label: 'AI Consultant', path: '/ai-consultant' },
    ],
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: 'Facility Management',
    children: [
      { icon: <Box className="w-5 h-5" />, label: 'Asset Management', path: '/facility-management/assets' },
      { icon: <Gauge className="w-5 h-5" />, label: 'Capacity Management', path: '/facility-management/capacity' },
      { icon: <Battery className="w-5 h-5" />, label: 'Energy Management', path: '/facility-management/energy' },
      { icon: <Thermometer className="w-5 h-5" />, label: 'Environmental Monitoring', path: '/facility-management/environmental' },
      { icon: <Shield className="w-5 h-5" />, label: 'Security Management', path: '/facility-management/security' },
      { icon: <Wrench className="w-5 h-5" />, label: 'Maintenance Management', path: '/facility-management/maintenance' },
      { icon: <AlertTriangle className="w-5 h-5" />, label: 'Incident Management', path: '/facility-management/incident' },
      { icon: <CheckSquare className="w-5 h-5" />, label: 'Compliance Management', path: '/facility-management/compliance' },
      { icon: <HardDrive className="w-5 h-5" />, label: 'Disaster Recovery', path: '/facility-management/disaster-recovery' },
      { icon: <FileCheck className="w-5 h-5" />, label: 'Service Management', path: '/facility-management/service' },
    ],
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    label: 'Sustainability',
    children: [
      { icon: <LineChart className="w-5 h-5" />, label: 'Metrics & Analytics', path: '/sustainability/metrics' },
      { icon: <Award className="w-5 h-5" />, label: 'Certifications', path: '/sustainability/certifications' },
      { icon: <Recycle className="w-5 h-5" />, label: 'Sustainable Practices', path: '/sustainability/practices' },
      { icon: <BarChart className="w-5 h-5" />, label: 'Dashboard', path: '/sustainability/dashboard' },
      { icon: <Target className="w-5 h-5" />, label: 'Initiatives', path: '/sustainability/initiatives' },
      { icon: <TrendingUp className="w-5 h-5" />, label: 'Continuous Improvement', path: '/sustainability/improvement' },
    ],
  },
  { icon: <Users className="w-5 h-5" />, label: 'Omni Channel Collaboration', path: '/omni-channel-collaboration' },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Knowledge Management', path: '/knowledge-management' },
  { icon: <MessageCircle className="w-5 h-5" />, label: 'Chat', path: '/chat' },
  { icon: <Search className="w-5 h-5" />, label: 'Search', path: '/search' },
  { icon: <CreditCard className="w-5 h-5" />, label: 'Subscription', path: '/subscription' },
  { icon: <HelpCircle className="w-5 h-5" />, label: 'FAQ', path: '/faq' },
  { icon: <InfoIcon className="w-5 h-5" />, label: 'About', path: '/about' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
];

export default navItems;
