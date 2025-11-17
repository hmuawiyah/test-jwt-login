import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/Navbar'
import Content from './components/Content';
import Features from './components/Features';
import GetStartedContent from './components/GetStartedContent';
import Footer from './components/Footer';

import useStore from "../../store/store"

export default function Home() {

    const { user } = useStore()

    return(
        <div className="px-4 sm:px-8 lg:px-20 xl:px-32">

            <Navbar user={user} />

            <Content />
            <Features />
            <GetStartedContent />

            <hr className="text-gray-400 mt-40 mb-5" />

            <Footer />
            
        </div>
    )
}