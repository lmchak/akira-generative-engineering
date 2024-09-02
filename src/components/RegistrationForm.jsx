import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreeTerms) {
      alert('Please agree to the Terms & Conditions')
      return
    }
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      })
      if (error) throw error
      alert('Registration successful! Please check your email to verify your account.')
      navigate('/profile')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreeTerms}
          onCheckedChange={setAgreeTerms}
        />
        <label htmlFor="terms" className="text-sm">
          I agree to the Terms & Conditions
        </label>
      </div>
      <Button type="submit" className="w-full">Create account</Button>
    </form>
  )
}

export default RegistrationForm