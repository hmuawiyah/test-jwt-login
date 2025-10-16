import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Navbar = () => {
  const [navMenu, setNavMenu] = useState('hidden')

  const toggleNavMenu = () => {
    if (navMenu === 'hidden') {
      setNavMenu('flex-row absolute left-0 text-md gap-2 px-9 pt-20 -translate-x-4 top-[-12px] min-w-screen min-h-[55vh] bg-[#394040]')
    } else {
      setNavMenu('hidden')
    }
  }


  return (
    <>
    <nav className="sticky top-0 z-30 navbar bg-[#394040] border-none shadow-lg px-5 h-16 border-2 rounded-2xl translate-y-[10px]!">
   
      <div className="cursor-pointer text-white flex items-center w-fit transition-all duration-300 hover:text-[#f8f34c]">
        <Link to={"/"}>
          <p className="font-semibold text-xl">TaskNest</p>
        </Link>
      </div>

      <ul className={`
        ${navMenu}
        md:flex md:absolute md:left-1/2 md:justify-center md:px-1 md:pt-2.5 md:-translate-x-1/2 md:top-[0px] md:min-w-70 md:min-h-[0vh] md:bg-transparent
         
        [&_span]:cursor-pointer [&_span]:btn [&_span]:bg-[#394040] [&_span]:rounded-lg [&_span]:text-[#efefef] [&_span]:text-lg
        [&_span]:border-[#394040] [&_span]:h-11 [&_span]:shadow-none [&_span]:hover:bg-[#1e2525] [&_span]:hover:border-[#1e2525]`}>
        <li><span><Link to={"/"}>Home</Link></span></li>
        <li><span><Link to={"/"}>Get Started</Link></span></li>
        <li><span><Link to={"https://github.com/hmuawiyah/"}>Author</Link></span></li>
        <li className="
          md:hidden mt-10 cursor-pointer text-lg font-bold btn bg-[#f8f34c] text-[#394040] border-none
          shadow-none rounded-lg px-0 w-24 h-9 hover:bg-[#cec92e] hover:border-[#cec92e]
        ">

          {true ?  
          <Link to={"/login"}>
            Login <FontAwesomeIcon icon={faRightToBracket} />
          </Link> 
            :
          <Link to={"/profile"}>
            Profile
          </Link>
          }
          
        </li>
      </ul>

      <div className="flex items-start absolute right-3 top-1/2 -translate-y-1/2">
        
        <span
          className="
          cursor-pointer hidden md:block text-lg font-bold btn bg-[#f8f34c] rounded-lg text-[#394040] border-none
          p-1 0 w-24 h-9 shadow-none hover:bg-[#cec92e] hover:border-[#cec92e]">

            {true ?  
            <Link to={"/login"}>
              Login <FontAwesomeIcon icon={faRightToBracket} />
            </Link> 
              :
            <Link to={"/profile"}>
              Profile
            </Link>
            }

        </span>

        <span 
            className="
              cursor-pointer md:hidden text-lg font-bold btn bg-[#f8f34c] rounded-lg text-[#394040] border-none
              p-1 w-14 h-9 shadow-none hover:bg-[#cec92e] hover:border-[#cec92e]"
            onClick={toggleNavMenu}>

            {navMenu === "hidden" ? (<FontAwesomeIcon icon={faBars} />) : (<FontAwesomeIcon icon={faXmark} />) } 

        </span>

      </div>

    </nav>
    </>
  )
}

export default Navbar
