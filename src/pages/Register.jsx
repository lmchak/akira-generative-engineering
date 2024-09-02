import React from 'react'
import RegistrationForm from '@/components/RegistrationForm'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col justify-center items-center text-white p-12">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8">
          <span className="text-purple-600 font-bold">LOGO</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Capturing Moments,</h1>
        <h2 className="text-3xl font-semibold mb-8">Creating Memories</h2>
        <div className="w-full h-64 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-white text-2xl">Image Placeholder</span>
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <Button asChild className="absolute top-4 right-4">
          <Link to="/">Back to website</Link>
        </Button>
        <h2 className="text-3xl font-bold mb-8">Create an account</h2>
        <RegistrationForm />
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Log in</Link>
        </p>
        <div className="mt-8">
          <p className="text-center mb-4">Or register with</p>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => alert('Google sign-in not implemented')}>
              Google
            </Button>
            <Button variant="outline" onClick={() => alert('Apple sign-in not implemented')}>
              Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register