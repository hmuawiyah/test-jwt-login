import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faBars, faXmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import useStore from "../../../store/store"

const Navbar = ({ user }) => {
  // const [navMenu, setNavMenu] = useState('hidden')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const { setContent } = useStore()

  useEffect(() => {
        
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('app-storage')
    navigate('/login')
  }

  return (
    <>
    <nav className="sticky top-0 z-30 navbar bg-[#394040] border-none shadow-lg px-5 h-16 border-2 rounded-2xl translate-y-[10px]!">

        <div className="navbar-start">
          <Link to={"/"}>
            <p className="cursor-pointer text-white font-semibold text-lg transition-all duration-300 hover:text-[#f8f34c]">TaskNest</p>
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

            <li><span><Link to="#" className="text-lg">Get Started</Link></span></li>
            <li><span><Link to={"https://github.com/hmuawiyah/"} target="_blank" className="text-lg">Author</Link></span></li>
          </ul>
        </div>

        <div className="navbar-end hidden lg:flex">
          { token
              ?
                <div className="dropdown dropdown-end">
                  <p tabIndex="0" role="button" className="cursor-pointer text-lg btn rounded-lg shadow-none border-none
                bg-[#f8f34c] text-[#394040] hover:bg-[#cec92e] hover:border-[#cec92e]">Profile</p>

                  <ul tabIndex="0" className="dropdown-content menu bg-base-100 rounded-box w-32 font-normal text-black p-2 !mt-2 !mx-0 !mb-0">
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
                      <Link to="#" className="text-lg">Get Started</Link>
                      <Link to={"https://github.com/hmuawiyah/"} target="_blank" className="text-lg">Author</Link>
                      </>
                    : <>
                    <Link to={"/"} className="text-lg">Home</Link>
                    <Link to="#" className="text-lg">Get Started</Link>
                    <Link to={"https://github.com/hmuawiyah/"} target="_blank" className="text-lg">Author</Link>
                    </>
                }
              </li>
              <li className="mt-4">
                { token 
                  ?  <a className="btn btn-outline btn-secondary rounded-lg" onClick={handleLogout} >Logout  <FontAwesomeIcon icon={faRightFromBracket} /></a>
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
