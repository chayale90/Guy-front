import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const GoogleAuthHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const user = searchParams.get('user');
        const token = searchParams.get('token');

        if (user && token) {
            localStorage.setItem('user', user);
            localStorage.setItem('token', token);
            navigate('/home', { replace: true });
        } else {
            console.error('Google Auth: Missing user or token');
            navigate('/');
        }
        setLoading(false);
    }, [location.search, navigate]);

    if (loading) {
        return console.log('Google Auth: Loading')
    }

    return null;
};
export default GoogleAuthHandler;