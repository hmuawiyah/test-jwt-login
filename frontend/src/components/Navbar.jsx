import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { getUser, updateUserById } from '../services/authService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faBars, faXmark, faRightFromBracket, faGear, faCircleInfo, faCircleUser } from '@fortawesome/free-solid-svg-icons'
// import { faUser } from '@fortawesome/free-regular-svg-icons'

import toast, { Toaster } from 'react-hot-toast'

import useStore from "../store/store"

const Navbar = ({ user }) => {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const [userId, setUserId] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const { setContent, setUser } = useStore()

  const successNotif = (action) => toast.success(`Success ${action} an user!`, {duration: 5000,})
  const failNotif = (action) => toast(`Failed to ${action} an user`, { icon: <FontAwesomeIcon className="text-[#00bafe]" icon={faCircleInfo} />, duration: 5000})

  // useEffect(() => {
        
  // }, [navigate])

  const handleUpdateUserById = async (e, id, userName, email, password) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const updatedData = {
      userName,
      email,
      password
    }

    if (!token) {
      navigate('/login')
      return
    }

    try {
      await updateUserById(token, id, updatedData)
      successNotif("update")

      setUserName("")
      setUserEmail("")
      setUserPassword("")

    } catch (err) {
      failNotif("update")
      console.log('Failed to update user:', err)
    }

    try {
      getUser(token)
        .then(res => {
          setUser(res.data.user)
        })
        .catch(() => {
          localStorage.removeItem('token')
          navigate('/login')
        })

    } catch (err) {
      failNotif("get")
      console.log('Failed to update user:', err)
    }
  }

  const tempValues = ({
    id = "", 
    userName = "", 
    email = ""
  } = {}) => {
    setUserId(id)
    setUserName(userName)
    setUserEmail(email)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('app-storage')
    navigate('/login')
  }

  return (
    <>

    <Toaster />

{/* --------------------------------------------------- UPDATE USER */}

    <input type="checkbox" id="modal_u_user_nav" className="modal-toggle" />
    <div className="modal" role="dialog">
      <div className="modal-box max-h-[90%] w-[95vw] md:w-[40vw] max-w-full sm:max-w-lg overflow-x-auto">
        <h3 className="text-lg font-semibold">Update User Form</h3>
        <hr className="my-5 h-[0.05rem] bg-gray-400 border-0" />
        
        <form className="flex flex-col gap-3" onSubmit={(e) => {
          handleUpdateUserById(e, userId, userName, userEmail, userPassword)
          document.getElementById("modal_u_user_nav").checked = false
        }}>
          <label className="label text-sm">Name</label>
          <input className="input w-full" type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Name" />
          <label className="label text-sm">Email</label>
          <input className="input w-full" type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Email" />
          <label className="label text-sm">Password</label>
          <input className="input w-full" type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} placeholder="password" />
          
          <button className="btn rounded-lg mt-5" type="submit">Update</button>
        </form>
        
        <div className="modal-action">
          <label htmlFor="modal_u_user_nav" className="btn rounded-lg">Close!</label>
        </div>
      </div>
    </div>

{/* --------------------------------------------------- NAVBAR */}

    <nav className="sticky top-0 z-30 navbar bg-[#394040] border-none shadow-lg pl-5 pr-6 lg:pr-3 h-16 border-2 rounded-2xl translate-y-[10px]!">

        <div className="navbar-start">
          <Link to={"/"}>
            <p className="cursor-pointer text-white font-semibold text-lg transition-all duration-300 hover:text-[#f8f34c]">EasyTask</p>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-[#efefef] items-center font-medium px-1">

            <li> 
              {token 
                  ?
                    <div className="dropdown">
                      <div tabIndex="0" role="button" className="m-1 text-lg">
                          Dashboard
                      </div>
                      <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box w-40 font-normal text-black -translate-x-[10px] p-2 !mt-2 !mx-0 !mb-0">
                        {user?.role === "admin" && (
                            <li><Link to={"/dashboard"} onClick={e => setContent("user")} className="text-lg">Team Members</Link></li>
                        )}
                        <li><Link to={"/dashboard"} onClick={e => setContent("task")} className="text-lg">Task</Link></li>
                      </ul>
                    </div>
                  : 
                    <Link to={"/"} className="text-lg">Home</Link>
              }

            </li>

            <li><span><Link to={"/about"} className="text-lg">About</Link></span></li>
            <li><span><Link to={"https://github.com/hmuawiyah/"} target="_blank" className="text-lg">Author</Link></span></li>
          </ul>
        </div>

        <div className="navbar-end hidden lg:flex">
          { token
              ?
                <div className="dropdown dropdown-end">
                  <p tabIndex="0" role="button" className="cursor-pointer text-lg btn rounded-lg shadow-none border-none
                bg-[#f8f34c] text-[#394040] hover:bg-[#cec92e] hover:border-[#cec92e]">Profile <FontAwesomeIcon icon={faCircleUser} /></p>

                  <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box w-32 font-normal text-black p-2 !mt-2 !mx-0 !mb-0">
                    <li className="mb-2">
                      <a className="btn rounded-lg" onClick={() => {
                        tempValues({
                          id:user._id, userName:user.userName, email:user.email})
                        setTimeout(() => {
                          document.getElementById("modal_u_user_nav").checked = true
                        }, 0)
                      }}>Setting <FontAwesomeIcon icon={faGear} /></a>
                    </li>

                    <li>
                      <a className="btn btn-outline btn-secondary rounded-lg" onClick={handleLogout}>Logout  <FontAwesomeIcon icon={faRightFromBracket} /></a>
                    </li>
                  </ul>
                </div>
              :
                <Link to={"/login"}>
                  <p tabIndex="0" role="button" className="cursor-pointer text-lg btn rounded-lg shadow-none border-none
                  bg-[#f8f34c] text-[#394040] hover:bg-[#cec92e] hover:border-[#cec92e]">Login <FontAwesomeIcon icon={faRightToBracket} /></p>
                </Link>
          }
        </div>

        <div className="navbar-end flex lg:hidden ">

          <div className="dropdown dropdown-end">
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden font-semibold text-xl text-white hover:text-black translate-x-[10px] p-2">
              <FontAwesomeIcon icon={faBars} />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-50 p-2 shadow">
                
              <li>
                { token 
                    ? <>
                      <a className="text-lg">Dashboard</a>
                      <ul className="p-2">
                        {user?.role === "admin" && (
                            <li><Link to={"/dashboard"} onClick={e => setContent("user")} className="text-lg">Team Members</Link></li>
                        )}
                        <li><Link to={"/dashboard"} onClick={e => setContent("task")} className="text-lg">Task</Link></li>
                      </ul>
                      <Link to="#" className="text-lg">About</Link>
                      <Link to={"https://github.com/hmuawiyah/"} target="_blank" className="text-lg">Author</Link>
                      </>
                    : <>
                    <Link to={"/"} className="text-lg">Home</Link>
                    <Link to={"/about"} className="text-lg">About</Link>
                    <Link to={"https://github.com/hmuawiyah/"} target="_blank" className="text-lg">Author</Link>
                    </>
                }
              </li>
              <li className="mt-4">
                { token 
                
                  ? <>
                      <a className="btn rounded-lg mb-2" onClick={() => {
                        tempValues({
                          id:user._id, userName:user.userName, email:user.email})
                        setTimeout(() => {
                          document.getElementById("modal_u_user_nav").checked = true
                        }, 0)
                      }}>Setting <FontAwesomeIcon icon={faGear} /></a>
                      
                      <a className="btn btn-outline btn-secondary rounded-lg" onClick={handleLogout} >Logout  <FontAwesomeIcon icon={faRightFromBracket} /></a>
                    </>

                  :  <Link to={"/login"} className="cursor-pointer btn rounded-lg text-md bg-[#f8f34c] text-[#394040] hover:bg-[#cec92e] hover:border-[#cec92e] shadow-none border-none"
                      >Login <FontAwesomeIcon icon={faRightToBracket} /></Link>
                }
              </li>
              
            </ul>
          </div>

        </div>

    </nav>
    </>
  )
}

export default Navbar
