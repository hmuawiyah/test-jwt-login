import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUser } from '../services/authService'
import { getTask } from '../services/taskService'

import ProfileUser from './components/ProfileUser'
import EditUser from './components/EditUser'
import EditTaskAdmin from './components/EditTaskAdmin'
import EditTaskMember from './components/EditTaskMember'
import Navbar from './components/Navbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableCellsLarge, faTableList } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'

import useViewStore from "../../store/store"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [userAll, setUserAll] = useState([])
  const [taskAll, setTaskAll] = useState(null)

  const navigate = useNavigate()

  const { view, setView, content, setContent } = useViewStore()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    getUser(token)
      .then(res => {
        setUser(res.data.user)
        setUserAll(res.data.userAll)
      })
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

  if (!user) return <div></div>

  return (

    <div className="px-4 sm:px-8 lg:px-20 xl:px-32">
      <Navbar />

{/* --------------------------------------------------- PROFILE */}
      <ProfileUser userAll={userAll} taskAll={taskAll} />


{/* --------------------------------------------------- USER / TASK */}
      {
        content === "user" 
            ? <EditUser userAll={userAll} setUserAll={setUserAll} />
            : <EditTaskAdmin user={user} setUser={setUser} userAll={userAll} setUserAll={setUserAll} taskAll={taskAll} setTaskAll={setTaskAll} />
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
