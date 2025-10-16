import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFile } from '@fortawesome/free-regular-svg-icons'


const Footer = () => {
  return (
    <>
      
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 pb-15 md:pb-20 items-start">

        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold text-md">Reach Out</p>
        </div>
        
        <div className="col-span-4 md:col-span-2">
          <p className=" text-md"><FontAwesomeIcon icon={faInstagram} /> Instagram</p>
          <p className=" text-md"><FontAwesomeIcon icon={faWhatsapp} /> Whatsapp</p>
          <p className=" text-md"><FontAwesomeIcon icon={faEnvelope} /> Help Desk</p>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold text-md">User Guide</p>
        </div>

        <div className="col-span-4 md:col-span-3">
          <p className=" text-md"><FontAwesomeIcon icon={faFile} /> User Control Made Easy</p>
          <p className=" text-md"><FontAwesomeIcon icon={faFile} /> Stay on Top of Your Tasks</p>
          <p className=" text-md"><FontAwesomeIcon icon={faFile} /> Bringing New People Onboard</p>
        </div>

        <div className="col-span-6 md:col-span-5 flex md:justify-end">
          {/* <p className="font-medium text-2xl">TaskNest</p> */}
          <p className="font-black text-5xl text-[#00000022]">TaskNest</p>
        </div>

      </div>

    </>
  )
}

export default Footer
