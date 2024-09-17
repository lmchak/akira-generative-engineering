import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabase } from '@/lib/supabase';

const supabase = getSupabase();

const getUserRoles = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data ? [data.role] : [];
};

const assignRoleToUser = async ({ userId, role }) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);
  if (error) throw error;
  return data;
};

const getRoles = async () => {
  // Since we don't have a separate roles table, we'll return a predefined list
  return ['admin', 'engineer', 'project_manager', 'user'];
};

export const useUserRoles = (userId) => useQuery({
  queryKey: ['userRoles', userId],
  queryFn: () => getUserRoles(userId),
  enabled: !!userId,
});

export const useAssignRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignRoleToUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['userRoles', variables.userId]);
    },
  });
};

export const useRoles = () => useQuery({ queryKey: ['roles'], queryFn: getRoles });
