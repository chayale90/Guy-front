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

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const redirectPath = useMemo(() => {
        if (admin === null) return null;
        return admin ? '/admin' : '/home';
    }, [admin]);

    if (!showNav || redirectPath === null || isLoading || admin !== false) return null;

    return (
        <nav className="bg-custom-header-bg w-full p-4 md:p-8 mx-auto flex justify-between items-center relative" dir="rtl">
            <div className="flex flex-row gap-4 items-center">

                <button onClick={handleLogout} className="p-2 flex flex-col items-center">
                    <FiLogOut size={23} color="#433eea" />
                    <span className="font-Assistant text-sm text-[#e30a0c]">יציאה</span>
                </button>
                <Link to="/profile" className="p-2 flex flex-col items-center">
                    <FaUser size={23} color="#1e19de" />
                    <span className="font-Assistant text-sm text-[#e30a0c]">איזור אישי</span>
                </Link>
            </div>

            <Link to={redirectPath} className="absolute left-1/2 transform -translate-x-1/2">
                <Logo />
            </Link>
        </nav>
    );
};

export default Nav;