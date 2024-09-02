import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
      <img src="/amu-logo.svg" alt="AMU Logo" className="w-32 mb-8" />
      <h1 className="text-5xl font-bold mb-4">Welcome to AMU</h1>
      <p className="text-2xl mb-8">Capturing Moments, Creating Memories</p>
      <div className="space-x-4">
        <Button asChild size="lg">
          <Link to="/register">Sign Up</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/login">Log In</Link>
        </Button>
      </div>
    </div>
  )
}

export default Index