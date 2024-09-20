import React from 'react'
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = ({ handleGoogleLogin }) => {
    return (
        <div className="py-4">
            <button onClick={handleGoogleLogin} className="flex items-center text-black bg-transparent border border-gray-300 rounded-full w-full font-normal text-[16px] justify-center p-2">
                <FcGoogle className="h-5 w-5 m-1" />
                <div className="text-center text-black font-normal lg:text-[18px] break-words font-Assistant">
                    כניסה באמצעות Google
                </div>
            </button>
        </div>
    )
}

export default GoogleButton