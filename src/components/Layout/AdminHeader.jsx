import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const AdminHeader = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        navigate('/');
    };


    return (
        <nav className="bg-custom-header-bg z-50">
            <div className="flex flex-wrap items-center justify-between mx-auto" dir='rtl'>
                <div className="flex">
                    <button
                        type="button"
                        aria-controls="navbar-search"
                        aria-expanded={isCollapsed}
                        className="md:hidden lg:hidden text-custom-blue rounded-lg text-sm p-2.5 me-1"
                        onClick={toggleCollapse}
                    >

                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block lg:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-custom-blue" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400" />
                            </svg>
                        </div>
                    </div>

                    {isCollapsed ? (
                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden text-custom-blue"
                            onClick={toggleCollapse}
                            aria-controls="navbar-search"
                            aria-expanded={!isCollapsed}
                        >
                            <i className="fa-solid fa-x fa-lg"></i>
                        </button>

                    ) : (
                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden text-custom-blue"
                            onClick={toggleCollapse}
                            aria-controls="navbar-search"
                            aria-expanded={!isCollapsed}
                        >
                            <i className="fa-solid fa-bars fa-xl"></i>
                        </button>
                    )}
                </div>

            </div>
            <div className={`items-center justify-between ${isCollapsed ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1 mx-3`} id="navbar-search" dir='rtl'>
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                    <button onClick={handleLogout} className="p-2 flex gap-1 items-center">
                        <FiLogOut size={20} color="#433eea" />
                        <span className="font-Assistant font-bold text-[#e30a0c]">התנתקות</span>
                    </button>
                    <Link to={'/admin'} className='block py-2 px-3 text-black font-Assistant font-bold text-[20px]'>מאכלים</Link>
                    <Link to={'/admin/users'} className='block py-2 px-3 text-black font-Assistant font-bold text-[20px]'>משתמשים</Link>
                </ul>
            </div>
        </nav>
    )
}

export default AdminHeader;