import React from 'react'
import LoginForm from '@/components/LoginForm'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col justify-center items-center text-white p-8 md:p-12">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8">
          <span className="text-purple-600 font-bold">LOGO</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Welcome Back</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">to Your Memories</h2>
        <div className="w-full h-48 md:h-64 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl md:text-2xl">Image Placeholder</span>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 md:p-12">
        <Button asChild className="mb-8 md:absolute md:top-4 md:right-4 text-gray-800 bg-white hover:bg-gray-100">
          <Link to="/">Back to website</Link>
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Log in to your account</h2>
        <div className="w-full max-w-sm">
          <LoginForm />
          <Link to="/forgot-password" className="mt-4 block text-center text-purple-600 hover:underline">Forgot Password?</Link>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-purple-600 hover:underline">Sign up</Link>
          </p>
        </div>
        <div className="mt-8 w-full max-w-sm">
          <p className="text-center mb-4">Or log in with</p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button className="w-full text-gray-800 bg-white hover:bg-gray-100" variant="outline" onClick={() => alert('Google sign-in not implemented')}>
              Google
            </Button>
            <Button className="w-full text-gray-800 bg-white hover:bg-gray-100" variant="outline" onClick={() => alert('Apple sign-in not implemented')}>
              Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login