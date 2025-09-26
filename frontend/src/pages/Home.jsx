import React, { useState } from 'react'
// import { login } from '../services/authService'
import { useNavigate, Link } from 'react-router-dom'

export default function Home() {
    return(
        <div>
            <h1>Welcome to homepage</h1>
            <Link to={"/register"}><button><h5>Register</h5></button></Link>
            <Link to={"/Login"}><button><h5>Login</h5></button></Link>
        </div>
    )
}