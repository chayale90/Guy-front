import React from 'react'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import { RiGlobalLine } from "react-icons/ri";

const HeaderFormLogin = () => {
    return (
        <>
            {/* Top Section */}
            <div className="flex flex-col items-center w-full">
                <div className='lg:max-h-32 h-full'>
                    <Logo />
                </div>
                <Link to={'https://www.guyl.co.il/'} target='_blank' className='flex justify-between text-center font-Assistant font-bold items-center text-custom-blue text-[18.33px] gap-0.5'>
                    <RiGlobalLine />
                    <p className='underline decoration-[#443eeacc] decoration-1 underline-offset-[2px]'>לאתר הבית של גיא</p>
                </Link>
            </div>

            {/* Medium Section */}
            <div className="flex items-center justify-center w-full py-5 md:py-0 lg:py-0">
                <div className='text-center'>
                    <span className="text-custom-blue text-4xl font-bold leading-custom break-words">
                        קבוצות
                    </span>
                    <span className="text-black text-4xl font-bold leading-custom break-words">
                        {' '}
                    </span>
                    <span className="text-custom-pink text-4xl font-bold leading-custom break-words">
                        המזון
                    </span>
                </div>
            </div>
        </>
    )
}

export default HeaderFormLogin