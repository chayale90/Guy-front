import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const WhatsUppButton = () => {
    return (
        <div>
            <Link to={'https://wa.me/972524555290'} target='_blank' className="fixed md:relative md:bottom-[-3rem] md:right-[-10rem] md:p-2 lg:relative sm:relative bottom-0 right-1 lg:bottom-[-7rem] lg:right-[-10rem] bg-[#5FD568] text-white p-1  rounded-full z-20 flex items-center">
                <FaWhatsapp size={34} />
            </Link>
        </div>
    )
}

export default WhatsUppButton