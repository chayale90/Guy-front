import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ element, adminOnly }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        return <Navigate to="/" replace />;
    }

    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return element;
};

export default PrivateRoute;
