import React from 'react'
import LoginForm from '@/components/LoginForm'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col justify-center items-center text-white p-12">
        <img src="/amu-logo.svg" alt="AMU Logo" className="w-24 mb-8" />
        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <h2 className="text-3xl font-semibold mb-8">to Your Memories</h2>
        <img src="/sand-dunes.jpg" alt="Sand Dunes" className="w-full rounded-lg shadow-lg" />
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <Button asChild className="absolute top-4 right-4">
          <Link to="/">Back to website</Link>
        </Button>
        <h2 className="text-3xl font-bold mb-8">Log in to your account</h2>
        <LoginForm />
        <Link to="/forgot-password" className="mt-4 text-purple-600 hover:underline">Forgot Password?</Link>
        <p className="mt-4">
          Don't have an account? <Link to="/register" className="text-purple-600 hover:underline">Sign up</Link>
        </p>
        <div className="mt-8">
          <p className="text-center mb-4">Or log in with</p>
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

export default Login