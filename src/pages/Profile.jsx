import React from 'react'
import UserProfile from '@/components/UserProfile'
import ImageUpload from '@/components/ImageUpload'

const Profile = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <UserProfile />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
          <ImageUpload />
        </div>
      </div>
    </div>
  )
}

export default Profile