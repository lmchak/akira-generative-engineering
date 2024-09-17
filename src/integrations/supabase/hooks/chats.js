import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupabase } from '@/lib/supabase';

const supabase = getSupabase();

const getChats = async (userId) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

const getChatById = async (id) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

const createChat = async ({ userId, name, messages }) => {
  const { data, error } = await supabase
    .from('documents')
    .insert({ user_id: userId, name, content: JSON.stringify(messages) })
    .select()
    .single();
  if (error) throw error;
  return data;
};

const updateChat = async ({ id, name, messages }) => {
  const { data, error } = await supabase
    .from('documents')
    .update({ name, content: JSON.stringify(messages) })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const deleteChat = async (id) => {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const useChats = (userId) => useQuery({
  queryKey: ['chats', userId],
  queryFn: () => getChats(userId),
  enabled: !!userId,
});

export const useChat = (id) => useQuery({
  queryKey: ['chat', id],
  queryFn: () => getChatById(id),
  enabled: !!id,
});

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChat,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['chats', variables.userId]);
    },
  });
};

export const useUpdateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateChat,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['chats', data.user_id]);
      queryClient.invalidateQueries(['chat', data.id]);
    },
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChat,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['chats']);
      queryClient.invalidateQueries(['chat', id]);
    },
  });
};
