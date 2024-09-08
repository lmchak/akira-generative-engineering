import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { useSupabaseAuth } from '@/integrations/supabase'
import Footer from '@/components/Footer'

const Index = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/profile');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-600 to-indigo-700 text-white">
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8">
          <span className="text-yellow-600 text-4xl">
            <span>GE</span><span className="js"></span>
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-railway font-bold mb-4 text-center">Welcome to <span>Generative Engineering</span><span className="js"></span></h1>
        <p className="text-xl sm:text-2xl mb-8 text-center">Quick and easy AI UI Framework</p>
        <div className="flex flex-col space-y-4 w-full max-w-md mb-6">
          <Button asChild size="lg" className="w-full bg-white text-yellow-600 hover:bg-gray-100 hover:text-yellow-700">
            <Link to="/register">Sign Up</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-yellow-600">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
        <div className="w-full max-w-md">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-white/60">Or Login/Register with:</span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent border-white text-white hover:bg-white hover:text-yellow-600"
              onClick={() => alert('Google sign-in not implemented')}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent border-white text-white hover:bg-white hover:text-yellow-600"
              onClick={() => alert('Apple sign-in not implemented')}
            >
              <FaApple className="mr-2 h-5 w-5" />
              Continue with Apple
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Index