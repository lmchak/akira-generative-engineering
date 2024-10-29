import { Bot, Component, Cable, Brain, Brush, Building, Construction, Home, Search, CreditCard, HelpCircle, Settings, MessageCircle, BookOpen, Activity, Users, Briefcase, MapIcon, TrendingUpIcon, MessageSquareIcon, UserIcon, BarChartIcon, CompassIcon, NewspaperIcon, InfoIcon, Cpu, Box, Battery, Gauge } from 'lucide-react';

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