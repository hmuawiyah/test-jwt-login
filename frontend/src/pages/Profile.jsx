import React, { useEffect, useState } from 'react'
import { getUser, deleteUserById, updateUserById } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [userAll, setUserAll] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

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

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleUpdateUserById = async (id, email, password, role) => {
    const token = localStorage.getItem('token')
    const updatedData = {
      email: email,
      password: password,
      role: role
    }
    alert(`updatedData: ${updatedData.email}, ${updatedData.password}, ${updatedData.role}`)

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const result = await updateUserById(token, id, updatedData)
      setUserAll(result.data.userAll)
    } catch (err) {
      console.error('Failed to update user:', err)
    }
  }

  const handleDeleteUserById = async (id) => {
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
  
  const formUpdate = (id, email, role) => {
    setUserId(id)
    setUserEmail(email)
    setUserRole(role)
  }


  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      

      {showForm && (<form onSubmit={() => handleUpdateUserById(userId, userEmail, userPassword, userRole)}>
        <h2>Update Form <button onClick={() => setShowForm(false)}>X</button></h2>
        <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} placeholder="password" />
        <input type="text" value={userRole} onChange={e => setUserRole(e.target.value)} placeholder="role" />
        <button type="submit">Update</button>
      </form>)}

      <hr />
      <br />

      <ul>
        {user.role == "admin" && userAll.map((val, i) => (
          <li key={val._id || i}>
            {val.email} - {val.password} - {val.role}
            <button onClick={() => {
              setShowForm(true)
              formUpdate(val._id, val.email, val.role)
            }}>Update</button>
            <button onClick={() => handleDeleteUserById(val._id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  )
}
