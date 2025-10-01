import React, { useEffect, useState } from 'react'
import { getUser, register, updateUserById, deleteUserById } from '../services/authService'
import { getTask, postTask, updateTaskById, deleteTaskById } from '../services/taskService'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [userAll, setUserAll] = useState(null)
  const [taskAll, setTaskAll] = useState(null)
  
  const [showUserForm, setShowUserForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showListUser, setShowListUser] = useState(true)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  
  const [userId, setUserId] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userRole, setUserRole] = useState("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [staffId, setStaffId] = useState("")
  const [status, setStatus] = useState("")

  const [taskId, setTaskId] = useState("")
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskStaffId, setTaskStaffId] = useState("")
  const [taskStatus, setTaskStatus] = useState("")

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

    getTask(token)
      .then(res => {
        setTaskAll(res.data.taskAll)
        })
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
      
  }, [navigate])

  // --------------------------------------------------- USER

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

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

  // --------------------------------------------------- TASK

  const handleRegisterTask = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const updatedData = {
      title,
      description,
      staffId,
      status
    }
    // alert(JSON.stringify(updatedData))

    try {
      // alert("Sebelum result!")
      const result = await postTask(token, updatedData)
      alert("Registrasi berhasil!")
      setTaskAll(result.data.taskAll)

      setTitle("")
      setDescription("")
      setStaffId("")
      setStatus("")

    } catch (err) {
      alert("Email telah digunakan")
      console.log(err.message)
    }
  }

  const handleUpdateTaskById = async (e, id, title, description, staffId, status) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const updatedData = {
      title,
      description,
      staffId,
      status
    }

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const result = await updateTaskById(token, id, updatedData)
      setTaskAll(result.data.taskAll)

      setTitle("")
      setDescription("")
      setStaffId("")
      setStatus("")

    } catch (err) {
      console.error('Failed to update user:', err)
    }
  }

  const handleDeleteTaskById = async (e, id) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      await deleteTaskById(token, id)
      setTaskAll(prev => prev.filter(user => user._id !== id))
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  const formTaskUpdate = (id, title, description, staffId, status) => {
    setTaskId(id)
    setTaskTitle(title)
    setTaskDescription(description)
    setTaskStaffId(staffId)
    setTaskStatus(status)
  }

  if (!user) return <div>Loading...</div>

  return (
  // --------------------------------------------------- PROFILE
    <div>
      <h2>Profile <button onClick={handleLogout}>Logout</button> </h2>
      <p>ID: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <br />
      <br />

      {user.role == "admin" && (
      <button onClick={() => setShowListUser(!showListUser)}>{showListUser ? "Close User & Task List" : "Open User & Task List"}</button>
      )}

      {showListUser && (<div>
        
      <hr />
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
      

      <br />
      <hr />

{/* --------------------------------------------------- CREATE TASK */}
      {user.role == "admin" && (<form onSubmit={(e) => handleRegisterTask(e, title, description, staffId, status)}>
        <h2>New Task Form</h2>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <select value={staffId} onChange={e => setStaffId(e.target.value)}>
          <option value="">-- Pilih Staff --</option>
          {
            userAll.map((val, i) => (
              <option value={val._id}>{val.email}</option>
            ))
          }
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">-- Pilih Status --</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Create</button>
      </form>)}

      <br />

{/* --------------------------------------------------- UPDATE TASK */}
      {showTaskForm && (<form onSubmit={(e) => handleUpdateTaskById(e, taskId, taskTitle, taskDescription, taskStaffId, taskStatus)}>
        <h2>Update Task Form <button type="button" onClick={() => setShowTaskForm(false)}>X</button></h2>
        <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} placeholder="Description" />
        <input type="text" value={taskStaffId} onChange={e => setTaskStaffId(e.target.value)} placeholder="Staff ID" />
        <select value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
          <option value="">-- Pilih Status --</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Update</button>
      </form>)}

      <br />

{/* --------------------------------------------------- LIST TASK */}
      <ul>
      {user.role == "admin" && taskAll.map((val, i) => (
        <li key={val._id || i}>
          {val._id} - {val.title} - staffId {val.staffId} - {val.status}
          <button onClick={() => {
            setShowTaskForm(true)
            formTaskUpdate(val._id, val.title, val.description, val.staffId, val.status)
          }}>Update</button>
          <button onClick={(e) => handleDeleteTaskById(e, val._id)}>Delete</button>
        </li>
      ))}
      </ul>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      </div>)}

    </div>
  )
}
