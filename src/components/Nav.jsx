import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useEffect, useState } from 'react';

const Nav = ({ showNav = true }) => {

    const [admin, setAdmin] = useState(false);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.role === 'admin') {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, []);

    if (!showNav) {
        return null;
    }


    return (
        <nav className='bg-custom-header-bg w-full p-1 mx-auto'>

            {admin ? (
                <Link to={'/admin'} className='flex justify-center items-center object-cover'>
                    <Logo />
                </Link>
            ) : (
                <Link to={'/home'} className='flex justify-center items-center object-cover'>
                    <Logo />
                </Link>
            )}
        </nav>
    )
}

export default Nav