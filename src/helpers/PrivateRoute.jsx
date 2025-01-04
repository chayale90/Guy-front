import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ element, adminOnly }) => {



    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);

        if (adminOnly && decodedToken.id.role !== 'admin') {
            return <Navigate to="/" replace />;
        }

        return element;
    } catch (error) {
        console.error('Invalid token:', error.message);
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;
