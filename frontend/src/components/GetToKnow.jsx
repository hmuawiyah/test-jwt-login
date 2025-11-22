import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'

export default function GetToKnow () {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-20 lg:mt-45">
      
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2">
                <p className="mb-4 text-lg font-medium uppercase tracking-[1px] opacity-50">Simplify Work With TaskNest</p>
                <h1 className="text-3xl lg:text-5xl md:leading-13 font-medium text-balance">Manage tasks easily, collaborate faster <br /> with TaskNest.</h1>
            </div>
            <div className="col-span-1 flex justify-start items-end mt-5">

                <Link to={"/about"}>
                    <button className="
                        btn border-none text-lg cursor-pointer shadow-none
                        bg-[#394040] rounded-lg text-[#efefef]  hover:bg-[#1e2525]
                        
                        [&_span]:bg-transparent [&_span]:text-[#f8f34c] [&_span]:shadow-none
                        [&_span]:text-lg [&_span]:border-none">
                        
                        <h5>Get to Know </h5><span><FontAwesomeIcon icon={faHandPointer} /></span>
                    </button>
                </Link>

            </div>
        </div>
        <div className="col-span-12 grid-cols-3 gap-4 mt-15 mx-3 lg:mx-0 hidden lg:grid">
            {/* <div className="
            col-span-3 md:col-span-2 h-40 md:h-85 bg-center bg-cover rounded-2xl
            bg-[url(https://images.unsplash.com/photo-1726796065425-475e3fb7c12a)]
            " /> */}

            <img
            src="https://images.unsplash.com/photo-1709715357510-b687304cee3a?w=1000&q=80&auto=format"
            className="col-span-3 md:col-span-2 h-[40vh] w-full object-cover object-botom rounded-2xl"
            loading="lazy"
            />

            {/* <div className="
            col-span-3 md:col-span-1 h-30 md:h-85 bg-center bg-cover rounded-2xl
            bg-[url(https://images.unsplash.com/photo-1726796065425-475e3fb7c12a)]
            " /> */}
            <img
            src="https://images.unsplash.com/photo-1709715357487-bd8d5f319560?w=1000&q=80&auto=format"
            className="col-span-3 md:col-span-1 h-[40vh] w-full object-cover object-center rounded-2xl"
            loading="lazy"
            />
        </div>


    </div>
  )
}

