import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabase } from '@/lib/supabase';

const supabase = getSupabase();

const getUserRoles = async (userId) => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', userId);
  if (error) throw error;
  
  const roleIds = data.map(item => item.role_id);
  
  const { data: roles, error: rolesError } = await supabase
    .from('roles')
    .select('name')
    .in('id', roleIds);
  if (rolesError) throw rolesError;
  
  return roles.map(role => role.name);
};

const assignRoleToUser = async ({ userId, roleName }) => {
  const { data: roleData, error: roleError } = await supabase
    .from('roles')
    .select('id')
    .eq('name', roleName)
    .single();
  if (roleError) throw roleError;

  const { data, error } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role_id: roleData.id });
  if (error) throw error;
  return data;
};

const removeRoleFromUser = async ({ userId, roleName }) => {
  const { data: roleData, error: roleError } = await supabase
    .from('roles')
    .select('id')
    .eq('name', roleName)
    .single();
  if (roleError) throw roleError;

  const { data, error } = await supabase
    .from('user_roles')
    .delete()
    .match({ user_id: userId, role_id: roleData.id });
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
