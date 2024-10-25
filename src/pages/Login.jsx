import React from 'react'
import LoginForm from '@/components/LoginForm'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { ArrowLeft } from 'lucide-react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1c28] text-white p-4 relative">
      <Link to="/" className="absolute top-4 right-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </Link>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Log in to your <br /> <span className="brand-text text-blue-500"><span>Akira</span><span className="js"></span></span> <br /> account</h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
        <LoginForm />
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1c1c28] text-gray-400">Or log in with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-700" onClick={() => alert('Google sign-in not implemented')}>
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-700" onClick={() => alert('Apple sign-in not implemented')}>
              <FaApple className="mr-2 h-4 w-4" />
              Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login