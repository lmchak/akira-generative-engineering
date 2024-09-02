import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSupabaseAuth } from '@/integrations/supabase'
import { useProfile, useUpdateProfile } from '@/integrations/supabase/hooks/profiles'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'sonner'

const UserProfile = () => {
  const { session } = useSupabaseAuth()
  const { data: profile, isLoading } = useProfile(session?.user?.id)
  const updateProfileMutation = useUpdateProfile()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    avatar_url: ''
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        avatar_url: profile.avatar_url || ''
      })
    }
  }, [profile])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfileMutation.mutateAsync({
        id: session.user.id,
        ...formData
      })
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile: ' + error.message)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!profile) return <div>No profile data</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Avatar className="w-24 h-24 mx-auto">
        <AvatarImage src={formData.avatar_url} alt={formData.first_name} />
        <AvatarFallback>{formData.first_name?.[0]}{formData.last_name?.[0]}</AvatarFallback>
      </Avatar>
      <Input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="avatar_url"
        placeholder="Avatar URL"
        value={formData.avatar_url}
        onChange={handleInputChange}
      />
      <Button type="submit" className="w-full">Update Profile</Button>
    </form>
  )
}

export default UserProfile