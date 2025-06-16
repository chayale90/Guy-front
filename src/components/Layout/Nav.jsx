import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Logo from './Logo';
import { jwtDecode } from 'jwt-decode';
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { getAuthenticatedUser, logout } from '../../helpers/Api';

const Nav = ({ showNav = true }) => {
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const user = await getAuthenticatedUser();
                setAdmin(user?.role === 'admin');
            } catch (error) {
                setAdmin(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAdmin();
    }, [location.pathname]);
    // useEffect(() => {
    //     const checkAdmin = () => {
    //         const token = localStorage.getItem('token');

    //         if (token) {
    //             try {
    //                 const decodedToken = jwtDecode(token);
    //                 setAdmin(decodedToken.role === 'admin');
    //             } catch (error) {
    //                 console.error('Invalid token:', error);
    //                 localStorage.removeItem('token');
    //                 setAdmin(false);
    //             }
    //         } else {
    //             setAdmin(false);
    //         }
    //         setIsLoading(false);
    //     };

    //     setTimeout(checkAdmin, 100);
    // }, [location.pathname]);

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('username');
    //     localStorage.removeItem('userId');
    //     navigate('/');
    // };

    // const redirectPath = useMemo(() => {
    //     if (admin === null) return null;
    //     return admin ? '/admin' : '/home';
    // }, [admin]);

    // if (!showNav || redirectPath === null) {
    //     return null;
    // }

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const redirectPath = useMemo(() => {
        if (admin === null) return null;
        return admin ? '/admin' : '/home';
    }, [admin]);

    if (!showNav || redirectPath === null) return null;

    return (
        <nav className='bg-custom-header-bg w-full p-14 mx-auto flex justify-between items-center relative'>
            {/* Centered Logo */}
            <Link to={redirectPath} className='absolute mt-3 left-1/2 transform -translate-x-1/2 flex justify-center items-center'>
                <Logo />
            </Link>

            {/* Profile Icon on the right (only for users, not admins) */}
            {!isLoading && admin === false && (
                <div className='ml-auto flex flex-row gap-2'>
                    <Link to={'/profile'} className='p-2 flex flex-col items-center'>
                        <FaUser size={23} color='#1e19de' />
                        <span className='font-Assistant font-normal text-[#e30a0c]'>איזור אישי</span>
                    </Link>
                    <button onClick={handleLogout} className="p-2 flex flex-col items-center">
                        <FiLogOut size={23} color="#433eea" />
                        <span className="font-Assistant font-normal text-[#e30a0c]">יציאה</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Nav;