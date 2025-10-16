import React, { useState } from 'react'
import { login } from '../services/authService'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await login(email, password)
    try {
      localStorage.setItem('token', res.data.token)
      console.log("res.data.token: "+res.data.token)
      console.log("res.data: "+res.data)
      alert("Login berhasil!")
      navigate('/profile')
    } catch (err) {
      alert(`Error handle submit: ${err.message}, ${res.data}`)
    }
  }

  return (
    <div className="px-4 sm:px-8 lg:px-20 xl:px-32 pb-20">

      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-12 justify-center xl:justify-between m-12 lg:mt-10 mx-20 border-1 border-[#394040] rounded-2xl">

        <div className="col-span-7 xl:col-span-8 hidden md:flex justify-center items-center">
          <div className="relative w-full h-[480px] bg-[url('https://images.unsplash.com/photo-1726796065425-475e3fb7c12a')] bg-center bg-cover rounded-l-2xl overflow-hidden">
        
            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Teks di atas overlay */}
            <div className="absolute z-20 w-full text-center text-white font-medium text-3xl top-1/2 -translate-y-1/2">
              <h5>One place for every<br/>task and user</h5>
            </div>

          </div>
        </div>

        <div className="col-span-5 xl:col-span-4 flex flex-col items-center justify-center p-5 mx-auto md:m-0">
          <form onSubmit={handleSubmit}>
          <fieldset className="fieldset rounded-2xl! rounded-box w-auto p-4 py-5">
            {/* <legend className="fieldset-legend text-white">Login</legend> */}

            <label className="label font-semibold">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

            <label className="label font-semibold">Password</label>
            <input type="password" className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
 
            <button className="btn bg-[#f8f34c] border-none shadow-none mt-4" type="submit">Login</button>
          </fieldset>
          </form>
          <br />

          <span>Don't have an account? <br /><Link to={"/register"} className="underline decoration-solid">Register here!</Link></span>
        </div>
      </div>

      
    </div>
  )
}
