import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthenticatedUser } from './Api';



const PrivateRoute = ({ element, adminOnly, clientOnly }) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const check = async () => {
            const user = await getAuthenticatedUser();
            if (!user) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            if (adminOnly && user.role !== 'admin') {
                setAuthorized(false);
            } else if (clientOnly && user.role === 'admin') {
                setAuthorized(false);
            } else {
                setAuthorized(true);
                setUser(user);
            }

            setLoading(false);
        };
        check();
    }, [adminOnly, clientOnly]);

    if (loading) return <div>טוען...</div>;

    return authorized ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;


