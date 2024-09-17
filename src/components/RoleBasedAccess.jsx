import React from 'react';
import { useSupabaseAuth } from '@/integrations/supabase';
import { useUserRoles } from '@/integrations/supabase/hooks/roles';

export const RoleBasedAccess = ({ children, allowedRoles }) => {
  const { session } = useSupabaseAuth();
  const { data: userRoles, isLoading } = useUserRoles(session?.user?.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const hasRequiredRole = userRoles?.some(role => allowedRoles.includes(role.role_name));

  return hasRequiredRole ? children : null;
};

export const useHasRole = (role) => {
  const { session } = useSupabaseAuth();
  const { data: userRoles } = useUserRoles(session?.user?.id);

  return userRoles?.some(userRole => userRole.role_name === role) || false;
};