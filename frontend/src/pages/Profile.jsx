import React, { useEffect, useState } from 'react'
import { getUser, deleteUserById } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [userAll, setUserAll] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    getUser(token)
      .then(res => {
        setUser(res.data.user)
        setUserAll(res.data.userAll)})
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
      
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleDeleteUserById = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      await deleteUserById(token, id)
      // Setelah berhasil delete, perbarui daftar user
      setUserAll(prev => prev.filter(user => user._id !== id))
    } catch (err) {
      console.error('Failed to delete user:', err)
      // Optional: tampilkan pesan error ke UI
    }
  }


  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleLogout}>Logout</button>

      <ul>
        {user.role == "admin" && userAll.map((val, i) => (
          <li key={val._id || i}>
            {val.name} - {val.email} - {val._id}
            <button onClick={() => handleDeleteUserById(val._id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}
