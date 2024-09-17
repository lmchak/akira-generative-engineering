import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

/*
### profiles

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | uuid                     | uuid   | true     |
| first_name | text                     | string | false    |
| last_name  | text                     | string | false    |
| email      | text                     | string | false    |
| avatar_url | text                     | string | false    |
| updated_at | timestamp with time zone | string | false    |

*/

const getProfiles = async () => {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  return data;
};

const getProfileById = async (id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

const createProfile = async (profile) => {
  const { data, error } = await supabase.from('profiles').insert(profile).select().single();
  if (error) throw error;
  return data;
};

const updateProfile = async ({ id, ...profile }) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const deleteProfile = async (id) => {
  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) throw error;
};

export const useProfiles = () => useQuery({ queryKey: ['profiles'], queryFn: getProfiles });

export const useProfile = (id) => useQuery({ 
  queryKey: ['profiles', id], 
  queryFn: () => getProfileById(id),
  enabled: !!id
});

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['profiles', data.id] });
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};
