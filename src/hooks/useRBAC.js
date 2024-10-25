import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';

export const useRBAC = () => {
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);

  const hasRole = (requiredRole) => {
    if (!profile) return false;
    
    switch (requiredRole) {
      case 'admin':
        return profile.role === 'admin';
      case 'moderator':
        return ['admin', 'moderator'].includes(profile.role);
      case 'user':
        return ['admin', 'moderator', 'user'].includes(profile.role);
      default:
        return false;
    }
  };

  return { hasRole, userRole: profile?.role };
};