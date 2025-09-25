import React, { useState } from 'react'
import { register } from '../services/authService'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await register(email, password)
      alert("Registrasi berhasil!")
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Daftar</button>
    </form>
  )
}
