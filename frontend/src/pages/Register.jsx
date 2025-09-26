import React, { useState } from 'react'
import { register } from '../services/authService'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
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
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Daftar</button>
    </form>
    <br />

    <span>already have account? </span><Link to={"/login"}>Login here!</Link>
    </div>
  )
}
