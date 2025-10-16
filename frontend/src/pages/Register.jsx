import React, { useState } from 'react'
import { register } from '../services/authService'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function Register() {
  const [email, setEmail] = useState('')
  const [retypeEmail, setRetypeEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if (email !== retypeEmail) {
      alert("Email tidak sesuai")
      return
    }

    try {
      await register(email, password)
      alert("Registrasi berhasil!")
      navigate("/login")
    } catch (err) {
      alert("Email telah digunakan")
      console.log(err.message)
    }
  }

  return (
    <div className="px-4 sm:px-8 lg:px-20 xl:px-32">

      <Navbar />
      <div className="flex flex-col items-center justify-center mt-12 lg:mt-30">

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset rounded-2xl! bg-[#fafaf4] border-2 border-[#ebebdd] rounded-box w-xs p-4 py-5">

          <label className="label font-semibold">Email</label>
          <input type="email" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

          <label className="label font-semibold">Retype Email</label>
          <input type="email" className="input" placeholder="Retype Email" value={retypeEmail} onChange={e => setRetypeEmail(e.target.value)} />

          <label className="label font-semibold">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

          <button className="btn bg-[#f8f34c] border-none shadow-none mt-4" type="submit">Register</button>
        </fieldset>
        </form>
        <br />

        <span>Already have account? <Link to={"/login"} className="underline decoration-solid">Login here!</Link></span>
      </div>
      
    </div>
  )
}
