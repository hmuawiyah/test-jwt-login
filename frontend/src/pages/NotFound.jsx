import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import useStore from "../store/store"

export default function NotFound() {

    const { user } = useStore()

    return(
        <div className="px-4 sm:px-8 lg:px-20 xl:px-32 flex flex-col min-h-screen">

            <div className="flex-1">

                <Navbar user={user} />

                <div className="flex flex-col justify-center items-center mt-12 lg:mt-30">

                    <p className="text-9xl font-medium mb-5 text-[#00000017]">404</p>
                    <p className="text-3xl font-semibold">PAGE NOT FOUND!</p>
                    <p className="text-md text-gray-500 mb-8">Page you are looking for not available!</p>
                    <Link to={"/"}>
                        <button className="
                            cursor-pointer btn bg-[#f8f34c] rounded-lg text-[#181600] border-[#f8f34c] shadow-none 
                            hover:bg-[#cec92e] hover:border-[#cec92e]">
                                
                            <h5><FontAwesomeIcon icon={faArrowRight} /> back to Home</h5>    
                        </button>
                    </Link>
                </div>

            </div>

            <hr className="text-gray-400 mt-40 mb-5" />
            <Footer />
        </div>
    )
}