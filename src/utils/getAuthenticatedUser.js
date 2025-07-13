import { jwtDecode } from 'jwt-decode';

export const getAuthenticatedUser = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const decoded = jwtDecode(token);

        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
            localStorage.removeItem('token');
            return null;
        }

        return {
            id: decoded.id || decoded._id,
            firstName: decoded.firstName,
            role: decoded.role,
        };
    } catch {
        return null;
    }
};