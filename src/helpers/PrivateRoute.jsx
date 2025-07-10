import { Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getAuthenticatedUser } from '../utils/getAuthenticatedUser';

const PrivateRoute = ({ element, adminOnly, clientOnly }) => {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAccess = () => {
            setAuthorized(false);
            try {
                const user = getAuthenticatedUser();
                if (!user) throw new Error('No user');

                if (adminOnly && user.role !== 'admin') {
                    setAuthorized(false);
                } else if (clientOnly && user.role === 'admin') {
                    setAuthorized(false);
                } else {
                    setAuthorized(true);
                }
            } catch {
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, [adminOnly, clientOnly]);

    if (loading) return <div>טוען...</div>;

    return authorized ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;