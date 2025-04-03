import React from 'react'
import { RiGlobalLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="w-full mt-10 bg-white p-4 text-center">
            <Link to={'https://www.guyl.co.il'} target='_blank' className='flex justify-center items-center text-custom-blue text-[18.33px] font-Assistant font-bold'>
                <p className='underline decoration-[#443eeacc] decoration-1 underline-offset-[2px]'>לאתר הבית של גיא</p>
                {" "}  <RiGlobalLine />
            </Link>
        </footer>
    )
}

export default Footer