import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const GoogleAuthHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const user = JSON.parse(decodeURIComponent(params.get('user')));
        const token = params.get('token');

        if (user && token) {
            console.log(user, token)
            localStorage.setItem('user', JSON.stringify({ ...user, token }));

            navigate('/home');
        } else {
            navigate('/');
        }
    }, [location, navigate]);

    return (
        <div>
            Authenticating... Please wait...
        </div>
    )
};
export default GoogleAuthHandler;