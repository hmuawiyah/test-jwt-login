import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableColumns, faShieldHalved, faCode, faLock, faChartSimple, faCircleCheck as faCircleCheckSolid } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb, faCircleCheck as faCircleCheckRegular } from '@fortawesome/free-regular-svg-icons'


import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import useStore from "../store/store"

export default function About() {

    const { user } = useStore()

    return(
        <div className="px-4 sm:px-8 lg:px-20 xl:px-32 ">

            <Navbar user={user} />

            <div className="space-y-10 mt-12 lg:mt-30">

            <div className="bg-[#fafaf4] border-2 border-[#ebebdd] rounded-2xl">
                <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                    <div className="badge bg-[#f8f34c] h-[7vh] w-[7vh]">
                    <FontAwesomeIcon className="text-2xl" icon={faTableColumns} />
                    </div>
                    <h2 className="card-title">What is EasyTask?</h2>
                </div>

                <p className="text-gray-500 mb-4">
                    EasyTask is an internal company app designed to organize and track work more neatly and efficiently.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="flex rounded-lg gap-3 p-4 bg-white border-2 border-[#ebebdd]">
                    
                    <div className="flex items-center justify-center bg-[#f8f34c] rounded-sm text-md h-[4vh] w-[4vh] md:text-lg md:h-[6vh] md:w-[6vh]">
                        <FontAwesomeIcon icon={faLock} />
                    </div>

                    <div>
                        <h4 className="font-semibold">Secure User Management</h4>
                        <p className="text-sm text-gray-500">Manage users & roles</p>
                    </div>

                    </div>

                    <div className="flex rounded-lg gap-3 p-4 bg-white border-2 border-[#ebebdd]">

                    <div className="flex items-center justify-center bg-[#f8f34c] rounded-sm text-md h-[4vh] w-[4vh] md:text-lg md:h-[6vh] md:w-[6vh]">
                        <FontAwesomeIcon icon={faCircleCheckSolid} />
                    </div>
                    <div>
                        <h4 className="font-semibold">Smart Task Tracking</h4>
                        <p className="text-sm text-gray-500">Create and track tasks</p>
                    </div>
                    </div>

                    <div className="flex rounded-lg gap-3 p-4 bg-white border-2 border-[#ebebdd]">

                    <div className="flex items-center justify-center bg-[#f8f34c] rounded-sm text-md h-[4vh] w-[4vh] md:text-lg md:h-[6vh] md:w-[6vh]">
                        <FontAwesomeIcon icon={faChartSimple} />
                    </div>
                    <div>
                        <h4 className="font-semibold">Dashboard Overview</h4>
                        <p className="text-sm text-gray-500">View activity & progress</p>
                    </div>

                    </div>
                </div>
                </div>
            </div>

            {/* User Roles */}
            <div className=" bg-[#fafaf4] border-2 border-[#ebebdd] rounded-2xl">
                <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                    <div className="badge bg-[#f8f34c] h-[7vh] w-[7vh]">
                    <FontAwesomeIcon className="text-2xl" icon={faShieldHalved} />
                    </div>
                    <h2 className="card-title">User Roles</h2>
                </div>
                <p className="text-gray-500 mb-4">Access levels for each EasyTask user</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Admin */}
                    <div className="rounded-lg border-2 bg-white border-[#ebebdd] space-y-3 p-5 ">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
                        <h3 className="text-3xl font-semibold">Admin</h3>
                        <span className="badge bg-[#f8f34c] text-[#394040] font-medium">Full Access</span>
                    </div>

                    <ul className="list-none space-y-2">
                        <li key={0} className="flex gap-2">
                            <span className="text-sm text-green-600"><FontAwesomeIcon icon={faCircleCheckRegular} /> Includes All Member-Level Features</span>
                        </li>
                        {[
                        "Manage all users",
                        "Manage all tasks",
                        "Full CRUD of all data",
                        "Set and change user roles",
                        "Monitor team performance."
                        ].map((item, i) => (
                        <li key={i} className="flex gap-2">
                            <span className="text-sm text-gray-500"><FontAwesomeIcon icon={faCircleCheckRegular} /> {item}</span>
                        </li>
                        ))}
                    </ul>
                    </div>

                    {/* Member */}
                    <div className="rounded-lg border-2 bg-white border-[#ebebdd] space-y-3 p-5 ">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
                        <h3 className="text-3xl font-semibold">Member</h3>
                        <span className="badge bg-[#394040] text-white font-medium">Personal Access</span>
                    </div>
                    
                    <ul className="list-none space-y-2">
                        {[
                        "Members focus on personal tasks",
                        "Create personal tasks",
                        "View your own tasks",
                        "Edit and update your own tasks",
                        "Delete your own tasks",
                        "Monitor your own progress and deadlines."
                        ].map((item, i) => (
                        <li key={i} className="flex gap-2">
                            <span className="text-sm text-gray-500"><FontAwesomeIcon icon={faCircleCheckRegular} /> {item}</span>
                        </li>
                        ))}
                    </ul>
                    </div>

                </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className=" bg-[#fafaf4] border-2 border-[#ebebdd] rounded-2xl">
                <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                    <div className="badge bg-[#f8f34c] h-[7vh] w-[7vh]">
                    <FontAwesomeIcon className="text-2xl" icon={faCode} />
                    </div>
                    <h2 className="card-title">Technology Stack</h2>
                </div>
                <p className="text-gray-500 mb-4">Powered by modern technology</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                    { name: "React", desc: "Frontend UI modern", cat: "Frontend" },
                    { name: "Vite", desc: "Lightning fast dev server", cat: "Modern build tool" },
                    { name: "Express & Node.js", desc: "Backend API", cat: "Backend" },
                    { name: "Tailwind CSS", desc: "Utility-first styling", cat: "Styling" },
                    { name: "DaisyUI", desc: "Ready-to-use UI components", cat: "UI" },
                    { name: "MongoDB", desc: "NoSQL Database", cat: "Database" }
                    ].map((tech, i) => (
                    <div key={i} className="rounded-lg border-2 bg-white hover:bg-base-200 border-[#ebebdd] p-4 transition">
                        <div className="flex items-center justify-between mb-2">
                        <FontAwesomeIcon icon={faLightbulb} />
                        <span className="badge bg-transparent border-2 border-[#ebebdd] text-xs">{tech.cat}</span>
                        </div>
                        <h4 className="font-bold">{tech.name}</h4>
                        <p className="text-sm text-base-content/70">{tech.desc}</p>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            </div>


            <hr className="text-gray-400 mt-40 mb-5" />

            <Footer />
            
        </div>
    )
}