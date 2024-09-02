// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import { useChats, useChat, useCreateChat, useUpdateChat, useDeleteChat } from './hooks/chats.js';
import { useProfiles, useProfile, useCreateProfile, useUpdateProfile, useDeleteProfile } from './hooks/profiles.js';
import { usePublicProfiles, usePublicProfile, useCreatePublicProfile, useUpdatePublicProfile, useDeletePublicProfile } from './hooks/public_profiles.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useChats,
  useChat,
  useCreateChat,
  useUpdateChat,
  useDeleteChat,
  useProfiles,
  useProfile,
  useCreateProfile,
  useUpdateProfile,
  useDeleteProfile,
  usePublicProfiles,
  usePublicProfile,
  useCreatePublicProfile,
  useUpdatePublicProfile,
  useDeletePublicProfile
};