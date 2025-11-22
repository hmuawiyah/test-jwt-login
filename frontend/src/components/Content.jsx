import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

export default function Content1() {
    return(

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 lg:mt-30">
             
                <div className="mx-3 lg:mx-0 lg:col-span-5">
                    {/* <div className="bg-[url(https://images.unsplash.com/photo-1726796065425-475e3fb7c12a)]
                    w-full h-55 md:h-85 bg-center bg-cover rounded-2xl" /> */}

                    <img
                    src="https://images.unsplash.com/photo-1709715357528-1d3d78ed6cfc?w=1000&q=80&auto=format"
                    className="w-full h-85 object-cover rounded-2xl"
                    loading="lazy"
                    />
                </div>

                <div className="lg:col-span-6 flex flex-col items-start justify-between h-85">
                    <div className="">
                        <h2 className="text-3xl md:text-5xl font-medium md:leading-13 mb-4">Simplify Workflow Improve Focus Achieve Goals</h2>
                        <p className="text-md mb-20 lg:mb-0 text-gray-700">
                            Manage your daily tasks effortlessly while keeping users in control. Our app helps you stay organized, focused, and efficient with intuitive features built for simplicity and performance
                        </p>
                    </div>

                    <div className="flex gap-2 items-center justify-start">
                        <Link to={"/register"}>
                            <button className="
                                cursor-pointer btn bg-[#f8f34c] rounded-lg text-[#181600] text-lg border-[#f8f34c] shadow-none 
                                hover:bg-[#cec92e] hover:border-[#cec92e]">
                                    
                                <h5>Register</h5>    
                            </button>
                        </Link>

                        <Link to={"/login"}>
                            <button className="
                                btn border-none text-lg cursor-pointer shadow-none rounded-lg
                                bg-[#394040] text-[#efefef] hover:bg-[#1e2525]
                                
                                [&_span]:text-lg [&_span]:text-[#f8f34c] [&_span]:shadow-none [&_span]:border-none ">
                                
                                <h5>Login </h5><span><FontAwesomeIcon icon={faRightToBracket} /></span>
                            </button>
                        </Link>
                    </div>

                </div>

            </div>
    )
}