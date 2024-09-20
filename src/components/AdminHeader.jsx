import React, { useState } from 'react'
import Logo from './Logo';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className="bg-custom-header-bg z-50">
            <div className="flex flex-wrap items-center justify-between mx-auto">
                <Link to={'/admin'} className="flex items-center rtl:space-x-reverse lg:hidden">
                    <Logo />
                </Link>
                <div className="flex">
                    <button
                        type="button"
                        aria-controls="navbar-search"
                        aria-expanded={isCollapsed}
                        className="md:hidden text-custom-blue rounded-lg text-sm p-2.5 me-1"
                        onClick={toggleCollapse}
                    >

                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block">
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
                <div className={`items-center justify-between ${isCollapsed ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-search" dir='rtl'>

                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                        <Link to={'/admin'} className='block py-2 px-3 text-black font-Assistant font-bold text-[20px]'>מאכלים</Link>
                        <Link to={'/admin/users'} className='block py-2 px-3 text-black font-Assistant font-bold text-[20px]'>משתמשים</Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminHeader;