import React, { useEffect, useState } from 'react'
import { getUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export default function ProfileUser() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    getUser(token)
      .then(res => {
        setUser(res.data.user)})
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
      
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (!user) return <div></div>

  return (
    <div>
      <h2>Profile <button onClick={handleLogout}>Logout</button> </h2>
      <p>ID: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}
