import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ element, adminOnly }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            return <Navigate to="/" replace />;
        }

        if (adminOnly && decodedToken.role !== 'admin') {
            return <Navigate to="/" replace />;
        }

        return element;
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        console.error('Invalid token:', error.message);
        return <Navigate to="/" replace />;
    }
};


export default PrivateRoute;
