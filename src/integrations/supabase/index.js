import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useProfiles, useProfile, useCreateProfile, useUpdateProfile, useDeleteProfile } from './hooks/profiles';
import { usePublicProfiles, usePublicProfile, useCreatePublicProfile, useUpdatePublicProfile, useDeletePublicProfile } from './hooks/public_profiles';
import { useChats, useChat, useCreateChat, useUpdateChat, useDeleteChat } from './hooks/chats';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useProfiles,
  useProfile,
  useCreateProfile,
  useUpdateProfile,
  useDeleteProfile,
  usePublicProfiles,
  usePublicProfile,
  useCreatePublicProfile,
  useUpdatePublicProfile,
  useDeletePublicProfile,
  useChats,
  useChat,
  useCreateChat,
  useUpdateChat,
  useDeleteChat,
};