import React, { useEffect, useState } from 'react'
import { getUser, register, updateUserById, deleteUserById } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

export default function EditUser() {
  const [user, setUser] = useState(null)
  const [userAll, setUserAll] = useState(null)
  
  const [showUserForm, setShowUserForm] = useState(false)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  
  const [userId, setUserId] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userRole, setUserRole] = useState("")

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

  // --------------------------------------------------- USER

  const handleRegisterUser = async (e) => {
    e.preventDefault()
    try {
      const result = await register(email, password, role)
      alert("Registrasi berhasil!")
      setUserAll(result.data.userAll)

      setEmail("")
      setPassword("")
      setRole("")

    } catch (err) {
      alert("Email telah digunakan")
      console.log(err.message)
    }
  }

  const handleUpdateUserById = async (e, id, email, password, role) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const updatedData = {
      email,
      password,
      role
    }

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const result = await updateUserById(token, id, updatedData)
      setUserAll(result.data.userAll)

      setEmail("")
      setPassword("")
      setRole("")

    } catch (err) {
      console.error('Failed to update user:', err)
    }
  }

  const handleDeleteUserById = async (e, id) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      await deleteUserById(token, id)
      setUserAll(prev => prev.filter(user => user._id !== id))
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }
  
  const formUserUpdate = (id, email, role) => {
    setUserId(id)
    setUserEmail(email)
    setUserRole(role)
  }

  if (!user) return <div>Loading...</div>

  return (
  // --------------------------------------------------- PROFILE
    <div>
{/* --------------------------------------------------- REGISTER USER */}
      {user.role == "admin" && (<form onSubmit={(e) => handleRegisterUser(e, userId, userEmail, userPassword, userRole)}>
        <h2>User Registration Form</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="">-- Pilih Status --</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <button type="submit">Register</button>
      </form>)}

      <br />

{/* --------------------------------------------------- UPDATE USER */}
      {showUserForm && (<form onSubmit={(e) => handleUpdateUserById(e, userId, userEmail, userPassword, userRole)}>
        <h2>Update User Form <button type="button" onClick={() => setShowUserForm(false)}>X</button></h2>
        <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} placeholder="password" />
        <select value={userRole} onChange={e => setUserRole(e.target.value)}>
          <option value="">-- Pilih Status --</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <button type="submit">Update</button>
      </form>)}

      <br />

{/* --------------------------------------------------- LIST USER */}
      <ul>
      {user.role == "admin" && userAll.map((val, i) => (
        <li key={val._id || i}>
          {val.email} - {val._id} - {val.role}
          <button onClick={() => {
            setShowUserForm(true)
            formUserUpdate(val._id, val.email, val.role)
          }}>Update</button>
          <button onClick={(e) => handleDeleteUserById(e, val._id)}>Delete</button>
        </li>
      ))}
      </ul>

    </div>
  )
}
