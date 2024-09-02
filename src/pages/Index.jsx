import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-4 sm:p-8">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8">
        <span className="text-purple-600 font-bold text-xl">LOGO</span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Welcome to AMU</h1>
      <p className="text-xl sm:text-2xl mb-8 text-center">Capturing Moments, Creating Memories</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <Button asChild size="lg" className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700">
          <Link to="/register">Sign Up</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
          <Link to="/login">Log In</Link>
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-purple-600"
          onClick={() => alert('Google sign-in not implemented')}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Continue with Google
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-purple-600"
          onClick={() => alert('Apple sign-in not implemented')}
        >
          <FaApple className="mr-2 h-5 w-5" />
          Continue with Apple
        </Button>
      </div>
    </div>
  )
}

export default Index