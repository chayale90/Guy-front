import React from 'react'
import Logo from '../Logo'


const HeaderFormLogin = () => {
    return (
        <>
            {/* Top Section */}
            <div className="flex flex-col items-center w-full">
                <div className='lg:max-h-32 h-full'>
                    <Logo />
                </div>
            </div>

            {/* Medium Section */}
            <div className="flex items-center justify-center w-full py-3 md:py-0 lg:py-0">
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