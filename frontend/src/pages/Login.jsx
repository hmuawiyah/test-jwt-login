import React, { useState } from 'react'
import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await login(email, password)
      localStorage.setItem('token', res.data.token)
      alert("Login berhasil!")
      navigate('/profile')
    } catch (err) {
      alert(`Error handle submit: ${err.message}, ${res.data}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )
}
