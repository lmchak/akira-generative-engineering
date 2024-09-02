import React from 'react'
import RegistrationForm from '@/components/RegistrationForm'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col justify-center items-center text-white p-8 md:p-12">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8">
          <span className="text-purple-600 font-bold">LOGO</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Capturing Moments,</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Creating Memories</h2>
        <div className="w-full h-48 md:h-64 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl md:text-2xl">Image Placeholder</span>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 md:p-12">
        <Button asChild className="mb-8 md:absolute md:top-4 md:right-4">
          <Link to="/">Back to website</Link>
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Create an account</h2>
        <RegistrationForm />
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Log in</Link>
        </p>
        <div className="mt-8 w-full max-w-sm">
          <p className="text-center mb-4">Or register with</p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button className="w-full" variant="outline" onClick={() => alert('Google sign-in not implemented')}>
              Google
            </Button>
            <Button className="w-full" variant="outline" onClick={() => alert('Apple sign-in not implemented')}>
              Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register