import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUser } from '../services/authService'
import { getTask } from '../services/taskService'

import ProfileUser from './components/ProfileUser'
import EditUser from './components/EditUser'
import EditTask from './components/EditTask'
import Navbar from './components/Navbar'

import useStore from "../../store/store"

export default function Profile() {
  // const [user, setUser] = useState(null)
  
  const navigate = useNavigate()
  const { view, setView, content, setContent, user, setUser } = useStore()

  const [userAll, setUserAll] = useState([])
  const [taskAll, setTaskAll] = useState([])
  const [visibleTasks, setVisibleTasks] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    Promise.all([getUser(token), getTask(token)])
      .then(([userRes, taskRes]) => {
        // console.log("userRes:", userRes.data)
        // console.log("taskRes:", taskRes.data)
        setUserAll(userRes.data.userAll || [])
        setTaskAll(taskRes.data.taskAll || [])
        // console.log(taskRes.data.taskAll)
      })
      .catch(() => {
        // console.log("masuk catch")
        localStorage.removeItem('token')
        navigate('/login')
      })

    // getTask(token)
    //   .then((res) => {
    //     setTaskAll(res.data.taskAll)
    //     // setTaskAll("res.data.taskAll")

    //   }).catch(() => {
    //     localStorage.removeItem('token')
    //     navigate('/login')
    //   })
  }, [navigate])

  useEffect(() => {
    if (!user || taskAll.length === 0) return

    if (user.role === "member") {
      setContent("task")
      setVisibleTasks(taskAll.filter(item => item.staffId?.userName === user.userName))
    } else {
      setContent("user")
      setVisibleTasks(taskAll)
    }

  }, [userAll, taskAll, setContent])



  if (!user) return <div></div>

  { console.log(visibleTasks) }

  return (

    <div className="px-4 sm:px-8 lg:px-20 xl:px-32">
      {/* <p>taskAll</p> */}
      {/* <p>{JSON.stringify(visibleTasks)}</p> */}
      <p>{visibleTasks.length}</p>
      {/* <p>{typeof taskAll}</p> */}
      <Navbar user={user} />


{/* --------------------------------------------------- PROFILE */}
      <ProfileUser user={user} userAll={userAll} taskAll={taskAll} />

{/* --------------------------------------------------- USER / TASK */}
      {
      content === "user" 
          ? <EditUser userAll={userAll} setUserAll={setUserAll} /> 
          : <EditTask user={user} setUser={setUser} userAll={userAll} setUserAll={setUserAll} taskAll={visibleTasks} setTaskAll={setTaskAll} />
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
