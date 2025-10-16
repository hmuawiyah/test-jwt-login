import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'

export default function GetStartedContent () {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-20 lg:mt-45">
      
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2">
                <p className="mb-4 text-lg font-medium uppercase tracking-[1px]">Simplify Work With TaskNest</p>
                <h1 className="text-3xl lg:text-5xl md:leading-13 font-medium text-balance">Manage tasks easily, collaborate faster <br /> with TaskNest.</h1>
            </div>
            <div className="col-span-1 flex justify-start items-end mt-5">

                <Link to={"/"}>
                    <button className="
                        flex justify-between items-center p-0 border-none text-lg
                        cursor-pointer btn bg-[#394040] rounded-lg text-[#efefef] w-42 h-11 shadow-none hover:bg-[#1e2525] group
                        
                        [&_h5]:flex [&_h5]:items-center [&_h5]:gap-0 [&_h5]:ml-3 
                        [&_span]:bg-[#f8f34c] [&_span]:text-[#394040] [&_span]:group-hover:bg-[#cec92e] [&_span]:group-hover:border-[#cec92e]
                        [&_span]:shadow-none [&_span]:btn [&_span]:w-0 [&_span]:px-4 [&_span]:h-7 [&_span]:mr-2 [&_span]:text-lg [&_span]:border-none">
                        
                        <h5>Get Started </h5><span><FontAwesomeIcon icon={faHandPointer} /></span>
                    </button>
                </Link>

            </div>
        </div>
        <div className="col-span-12 grid grid-cols-3 gap-4 mt-15 mx-3 lg:mx-0">
            <div className="
            col-span-3 md:col-span-2 h-40 md:h-85 bg-center bg-cover rounded-2xl
            bg-[url(https://images.unsplash.com/photo-1726796065425-475e3fb7c12a)]
            " />
            <div className="
            col-span-3 md:col-span-1 h-30 md:h-85 bg-center bg-cover rounded-2xl
            bg-[url(https://images.unsplash.com/photo-1726796065425-475e3fb7c12a)]
            " />
        </div>


    </div>
  )
}

