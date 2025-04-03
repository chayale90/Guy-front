import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Logo from './Logo';
import { jwtDecode } from 'jwt-decode';

const Nav = ({ showNav = true }) => {
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkAdmin = () => {
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setAdmin(decodedToken.role === 'admin');
                } catch (error) {
                    console.error('Invalid token:', error);
                    localStorage.removeItem('token');
                    setAdmin(false);
                }
            } else {
                setAdmin(false);
            }
            setIsLoading(false);
        };

        setTimeout(checkAdmin, 100);
    }, [location.pathname]);

    const redirectPath = useMemo(() => {
        if (admin === null) return null;
        return admin ? '/admin' : '/home';
    }, [admin]);

    if (!showNav || redirectPath === null) {
        return null;
    }

    return (
        <nav className='bg-custom-header-bg w-full p-14 mx-auto flex justify-between items-center relative'>
            {/* Centered Logo */}
            <Link to={redirectPath} className='absolute mt-3 left-1/2 transform -translate-x-1/2 flex justify-center items-center'>
                <Logo />
            </Link>

            {/* Profile Icon on the right (only for users, not admins) */}
            {!isLoading && admin === false && (
                <Link to={'/profile'} className='ml-auto p-2'>
                    <i className="fa-solid fa-user text-2xl"></i>
                </Link>
            )}
        </nav>
    );
};

export default Nav;