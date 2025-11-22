import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUser, getUserAll } from '../services/authService'
import { getTask, getTaskByid } from '../services/taskService'

import ProfileUser from '../components/ProfileUser'
import EditUser from '../components/EditUser'
import EditTask from '../components/EditTask'
import Navbar from '../components/Navbar'

import useStore from "../store/store"

export default function Profile() {
  // const [user, setUser] = useState(null)
  
  const navigate = useNavigate()
  const { view, setView, content, setContent, user, setUser } = useStore()

  const [userAll, setUserAll] = useState([])
  const [taskAll, setTaskAll] = useState([])
  // const [visibleTasks, setVisibleTasks] = useState([])

  
  useEffect(() => {
    
  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/login')
    return
  }

  if (!user) return

  // --- ADMIN ---
  if (user.role === "admin") {
    Promise.all([getUserAll(token), getTask(token)])
      .then(([userRes, taskRes]) => {
        setUserAll(userRes.data.userAll || [])
        setTaskAll(taskRes.data.taskAll || [])
      })
      .catch(() => {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("app-storage")
        navigate("/login")
      })
  }

  // --- MEMBER ---
  if (user.role === "member") {
    getTaskByid(token, user._id)
      .then(res => {
        setTaskAll(res.data.taskAll || [])
      })
      .catch(() => {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("app-storage")
        navigate("/login")
      })
  }
}, [user, navigate])

  if (!user) return <div></div>

  return (

    <div className="px-4 sm:px-8 lg:px-20 xl:px-32">
      <Navbar user={user} />


{/* --------------------------------------------------- PROFILE */}
      <ProfileUser user={user} userAll={userAll} taskAll={taskAll} />

{/* --------------------------------------------------- USER / TASK */}
      {
      content === "user" && user.role === "admin"
          ? <EditUser userAll={userAll} setUserAll={setUserAll} /> 
          : <EditTask user={user} setUser={setUser} userAll={userAll} setUserAll={setUserAll} taskAll={taskAll} setTaskAll={setTaskAll} />
      }
      
      {/* <EditTaskMember /> */}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
