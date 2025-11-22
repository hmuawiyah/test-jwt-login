import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFile } from '@fortawesome/free-regular-svg-icons'


const Footer = () => {
  return (
    <>
      
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 pb-15 md:pb-15 items-start">

        <div className="col-span-2 md:col-span-1 uppercase">
          <p className="font-semibold text-sm">Reach Out</p>
        </div>
        
        <div className="col-span-4 md:col-span-3">
          <p className=" text-sm"><FontAwesomeIcon icon={faWhatsapp} /> +1 910-123-123</p>
          <p className=" text-sm"><FontAwesomeIcon icon={faInstagram} /> EasyTask_sample</p>
          <p className=" text-sm"><FontAwesomeIcon icon={faEnvelope} /> support@sample.com</p>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="font-semibold text-sm uppercase">User Guide</p>
        </div>

        <div className="col-span-4 md:col-span-3">
          <p className=" text-sm"><FontAwesomeIcon icon={faFile} /> User Control Made Easy</p>
          <p className=" text-sm"><FontAwesomeIcon icon={faFile} /> Stay on Top of Your Tasks</p>
          <p className=" text-sm"><FontAwesomeIcon icon={faFile} /> Bringing New People Onboard</p>
        </div>

        <div className="col-span-6 md:col-span-4 flex md:justify-end">
          {/* <p className="font-medium text-2xl">TaskNest</p> */}
          <p className="font-bold -tracking-[3px] text-5xl text-[#00000017]">EasyTask</p>
        </div>

      </div>

    </>
  )
}

export default Footer
