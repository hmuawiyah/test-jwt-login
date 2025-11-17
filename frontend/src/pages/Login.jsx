import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getUser, login } from '../services/authService'

import Navbar from './components/Navbar'
import useStore from "../../store/store"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { setUser } = useStore()

  const successNotif = (action) => toast.success(`Success ${action} a new user!`, {duration: 5000,})
  const failNotif = (action) => toast(`Failed to ${action} a new user`, { icon: <FontAwesomeIcon className="text-[#00bafe]" icon={faCircleInfo} />, duration: 5000 },)


  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await login(email, password)

      const token = res.data?.token
      if (!token) throw new Error("Token not found in response")
      localStorage.setItem('token', res.data.token)

      const userRes = await getUser(token)
      setUser(userRes.data.user)
      // setUserAll(userRes.data.userAll)

      // alert("Login success!")
      successNotif("create")
      
      navigate('/dashboard')
    } catch (err) {
      failNotif("create")
      localStorage.removeItem("token")
    }
  }
  

  return (
    <div className="px-4 sm:px-8 lg:px-20 xl:px-32 pb-20">
      <Toaster />

      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-12 justify-center xl:justify-between m-12 lg:mt-10 min-h-[580px] mx-auto border-2 border-[#ebebdd] rounded-2xl">

        <div className="col-span-7 xl:col-span-8 hidden md:flex justify-center items-center">
          <div className="relative w-full h-full bg-[url('https://images.unsplash.com/photo-1726796065425-475e3fb7c12a')] bg-center bg-cover rounded-l-2xl overflow-hidden">
        
            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Teks di atas overlay */}
            <div className="absolute z-20 w-full text-center text-white font-medium text-3xl top-1/2 -translate-y-1/2">
              <h5>One place for every<br/>task and user</h5>
            </div>

          </div>
        </div>

        <div className="col-span-5 xl:col-span-4 flex flex-col items-center justify-center rounded-2xl! bg-[#fafaf4] rounded-box p-5 mx-auto md:m-0">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset w-auto p-4 py-5">
              <legend className="fieldset-legend font-semibold text-3xl text-[#394040]">Sign In to Your Account</legend>

              <label className="label font-semibold">Email</label>
              <input type="email" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

              <label className="label font-semibold">Password</label>
              <input type="password" className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
  
              <button className="btn bg-[#f8f34c] border-none shadow-none mt-4" type="submit">Login <FontAwesomeIcon icon={faRightToBracket} /></button>
            </fieldset>
          </form>
          <br />

          <span>Don't have an account? <Link to={"/register"} className="underline decoration-solid">Register here!</Link></span>
        </div>
      </div>

      
    </div>
  )
}
