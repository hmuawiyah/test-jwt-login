import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faCircleCheck, faChartSimple } from '@fortawesome/free-solid-svg-icons'

const FeatureBox = ({ icon, title, desc }) => {
    return(

        <div className="col-span-4">
        <div className="h-[28vh] md:h-[30vh] bg-[#fafaf4] border-2 border-[#ebebdd] rounded-2xl">
            
            <div className="absolute flex items-center justify-center bg-[#f8f34c] rounded-lg text-xl h-[7vh] w-[7vh] ml-4 mt-4 ">
                {icon}
            </div>
            
            <div className="flex flex-col justify-between h-[calc(100%-1rem)] w-[calc(100%-1rem)] pt-22 md:pt-22 pl-4">
                <div className="font-medium text-2xl">
                    {title}
                </div>
                <div className="">
                    {desc}
                </div>
            </div>

        </div>
        </div>
            
    )
}

export default function Features() {
    return(

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-30 lg:mt-45">
            
            <FeatureBox icon={<FontAwesomeIcon icon={faLock} />} title={"Secure User Management"}
            desc={"Add, edit, or remove users easily with roles to keep your team secure and organized."} />
            
            <FeatureBox icon={<FontAwesomeIcon icon={faCircleCheck} />} title={"Smart Task Tracking"}
            desc={"Create and track tasks easily. Stay updated and keep your projects running smoothly."} />
            
            <FeatureBox icon={<FontAwesomeIcon icon={faChartSimple} />} title={"Dashboard Overview"}
            desc={"View user activity and task progress easily all in one clear, simple dashboard."} />

        </div>
    )
}