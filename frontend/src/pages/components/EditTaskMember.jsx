import React, { useEffect, useState } from 'react'
import { getUser } from '../../services/authService'
import { getTask, getTaskByid, postTask, updateTaskById, deleteTaskById } from '../../services/taskService'
import { useNavigate } from 'react-router-dom'

export default function EditTaskMember() {
  const [user, setUser] = useState(null)
  const [userAll, setUserAll] = useState(null)
  const [taskAll, setTaskAll] = useState(null)
  
  const [showTaskForm, setShowTaskForm] = useState(false)
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [staffId, setStaffId] = useState("")
  const [status, setStatus] = useState("")

  const [taskId, setTaskId] = useState("")
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  // const [taskStaffId, setTaskStaffId] = useState("")
  const [taskStatus, setTaskStatus] = useState("")

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    getUser(token)
      .then(res => {
        const fetchedUser = res.data.user
        setUser(fetchedUser)
        // setUserAll(res.data.userAll)
        // console.log({fetchedUser})
        return getTaskByid(token, fetchedUser._id)
      })
      .then(res => {
        setTaskAll(res.data.taskAll)
      })
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/login')
      })
      
  }, [navigate])

  // --------------------------------------------------- TASK

  const handleRegisterTask = async (e, title, description, staffId, status) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const updatedData = {
      title,
      description,
      staffId,
      status
    }

    try {
      const result = await postTask(token, updatedData)
      alert("Registrasi berhasil!")
      setTaskAll(result.data.taskAll)

      setTitle("")
      setDescription("")
      // setStaffId("")
      setStatus("")

    } catch (err) {
      alert(JSON.stringify(updatedData))
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

    alert(JSON.stringify(updatedData))

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const result = await updateTaskById(token, id, updatedData)
      setTaskAll(result.data.taskAll)

      setTitle("")
      setDescription("")
      // setStaffId("")
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
      console.error('Failed to delete task:', err.message)
    }
  }

  const formTaskUpdate = (id, title, description, status) => {
    setTaskId(id)
    setTaskTitle(title)
    setTaskDescription(description)
    // setTaskStaffId(staffId)
    setTaskStatus(status)
  }

  if (!user) return <div></div>

  return (
  // --------------------------------------------------- PROFILE
    <div>
{/* --------------------------------------------------- CREATE TASK */}
      {user.role == "member" && (<form onSubmit={(e) => handleRegisterTask(e, title, description, user._id, status)}>
        <h2>New Task Form</h2>
        <h2>{user._id}</h2>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
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
      {showTaskForm && (<form onSubmit={(e) => handleUpdateTaskById(e, taskId, taskTitle, taskDescription, user._id, taskStatus)}>
        <h2>Update Task Form <button type="button" onClick={() => setShowTaskForm(false)}>X</button></h2>
        <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} placeholder="Description" />
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
      {user.role == "member" && taskAll?.map((val, i) => (
        <li key={val._id || i}>
          {val._id} - {val.title} - staffId {val.staffId} - {val.status}
          <button onClick={() => {
            setShowTaskForm(true)
            formTaskUpdate(val._id, val.title, val.description, val.status)
          }}>Update</button>
          <button onClick={(e) => handleDeleteTaskById(e, val._id)}>Delete</button>
        </li>
      ))}
      </ul>
    </div>
  )
}
