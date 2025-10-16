import React, { useEffect, useState } from 'react'
import { getUser } from '../services/authService'
import ProfileUser from './components/ProfileUser'
import EditUser from './components/EditUser'
import EditTaskAdmin from './components/EditTaskAdmin'
import EditTaskMember from './components/EditTaskMember'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [showListUser, setShowListUser] = useState(true)
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

  if (!user) return <div></div>

  return (
  // --------------------------------------------------- PROFILE
    <div>
      <ProfileUser/>

      {user.role == "admin" && (
      <button onClick={() => setShowListUser(!showListUser)}>{showListUser ? "Close User & Task List" : "Open User & Task List"}</button>
      )}

      <hr />

      {showListUser && (<div>
      <EditUser />
      

      <EditTaskAdmin />
      </div>)}

      <EditTaskMember />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
