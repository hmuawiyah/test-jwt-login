import React, { useEffect, useState } from 'react'
import { getUser } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faList, faTableCellsLarge, faTableList, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck, faClock, faUser } from '@fortawesome/free-regular-svg-icons'

import useViewStore from "../../../store/store"

export default function ProfileUser({ userAll, taskAll }) {
  
  const [user, setUser] = useState(null)
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
      })
      .catch(() => {
          localStorage.removeItem('token')
          navigate('/login')
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const StateBox = ({ title, value, icon, textColor, bgColor }) => {
    return(
      <div className="stats bg-[#fafaf4] border-2 border-[#ebebdd]">
        <div className="stat">
          <div className="text-sm text-gray-500 mb-2">{title}</div>
          <div className="stat-value font-medium flex justify-between items-center gap-5">
            <div className="text-[#394040]">
              {value}
            </div>
            <div className={`w-12 aspect-square ${bgColor} flex items-center justify-center ${textColor} text-2xl rounded-lg`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const BadgeRole = (role) => {
    return (
      <>
        {role.role === "admin" ? (
          <span className="badge badge-xl bg-[#bde9ff] text-[#1291cf]">admin</span>
        ) : (
          <span className="badge badge-xl bg-[#fef8c8] text-[#877800]">member</span>
        )}
      </>
    )
  }

  if (!user) return <div></div>

  return (
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-3 mt-12 lg:mt-15 overflow-hidden">
        <div className="col-span-12">
          <p className="font-medium text-md mb-2">{getTodayDate()}</p>
          <p className="font-normal text-5xl">Welcome, {user.userName} <BadgeRole role={user.role} /></p> 
        </div>
       
{/* --------------------------------------------------- TOGGLE VIEW */}
        <div className="col-span-12 flex justify-end">

          <div className="col-span-4 tabs tabs-box p-2 font-medium [&_label]:cursor-pointer">

            <input
              type="radio" id="table" name="view" className="hidden peer/table"
              checked={view === "table"} onChange={() => setView("table")}
            />
            <label
              htmlFor="table"
              className="tab peer-checked/table:!bg-[#f8f34c] peer-checked/table:!text-[#394040] transition"
            >
              <FontAwesomeIcon icon={faTableList} />
              <span>Table view</span>
            </label>

            <input type="radio" id="grid" name="view" className="hidden peer/grid"
              checked={view === "grid"} onChange={() => setView("grid")}
            />
            <label
              htmlFor="grid"
              className="tab peer-checked/grid:!bg-[#f8f34c] peer-checked/grid:!text-[#394040] transition"
            >
              <FontAwesomeIcon icon={faTableCellsLarge} />
              <span>Grid view</span>
            </label>
          </div>
          
        </div>

{/* --------------------------------------------------- TOGGLE VIEW */}      
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StateBox title={"Total tasks"} value={taskAll?.length} icon={<FontAwesomeIcon icon={faList} />} textColor="text-[#394040]" bgColor="bg-[#f8f8f8]" />
          <StateBox title={"In Progress"} value={taskAll?.filter(item => item.status === "in progress").length} icon={<FontAwesomeIcon icon={faClock} />} textColor="text-[#fcb700]" bgColor="bg-[#fffaf0]" />
          <StateBox title={"Completed"} value={taskAll?.filter(item => item.status === "completed").length} icon={<FontAwesomeIcon icon={faCircleCheck} />} textColor="text-[#00d390]" bgColor="bg-[#f1fcf6]" />
          <StateBox title={"Team Members"} value={userAll?.length} icon={<FontAwesomeIcon icon={faUser} />} textColor="text-[#394040]" bgColor="bg-[#f8f8f8]" />
        </div>

{/* --------------------------------------------------- HR */} 
        <div className="col-span-12">
            <hr className="my-1 h-[0.1rem] bg-[#ddddd1] border-0" />
        </div>

{/* --------------------------------------------------- TOGGLE CONTENT */}          
        <div className="col-span-12 flex justify-center mt-10 mb-6">

            <div className="flex justify-center tabs tabs-box p-2 font-medium [&_label]:cursor-pointer">

              <input
                type="radio" id="user" name="content" className="hidden peer/user"
                checked={content === "user"} onChange={() => setContent("user")}
              />
              <label
                htmlFor="user"
                className="tab peer-checked/user:!bg-[#f8f34c] peer-checked/user:!text-[#394040] transition"
              >
                <FontAwesomeIcon icon={faUser} />
                <span>User content</span>
              </label>

              <input type="radio" id="task" name="content" className="hidden peer/task"
                checked={content === "task"} onChange={() => setContent("task")}
              />
              <label
                htmlFor="task"
                className="tab peer-checked/task:!bg-[#f8f34c] peer-checked/task:!text-[#394040] transition"
              >
                <FontAwesomeIcon icon={faListCheck} />
                <span>Task content</span>
              </label>
            </div>

        </div>

        

      </div>
  )
}
