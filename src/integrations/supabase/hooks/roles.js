import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const getUserRoles = async (userId) => {
  const { data, error } = await supabase.rpc('get_user_roles', { p_user_id: userId });
  if (error) throw error;
  return data;
};

const assignRoleToUser = async ({ userId, roleName }) => {
  const { data, error } = await supabase.rpc('assign_role_to_user', { p_user_id: userId, p_role_name: roleName });
  if (error) throw error;
  return data;
};

const removeRoleFromUser = async ({ userId, roleName }) => {
  const { data, error } = await supabase.rpc('remove_role_from_user', { p_user_id: userId, p_role_name: roleName });
  if (error) throw error;
  return data;
};

const getRoles = async () => {
  const { data, error } = await supabase.from('roles').select('*');
  if (error) throw error;
  return data;
};

const createRole = async ({ name, description }) => {
  const { data, error } = await supabase.from('roles').insert({ name, description }).select().single();
  if (error) throw error;
  return data;
};

const updateRole = async ({ id, name, description }) => {
  const { data, error } = await supabase.from('roles').update({ name, description }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

const deleteRole = async (id) => {
  const { error } = await supabase.from('roles').delete().eq('id', id);
  if (error) throw error;
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

export const useRemoveRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeRoleFromUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['userRoles', variables.userId]);
    },
  });
};

export const useRoles = () => useQuery({ queryKey: ['roles'], queryFn: getRoles });

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['roles']);
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['roles']);
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries(['roles']);
    },
  });
};
