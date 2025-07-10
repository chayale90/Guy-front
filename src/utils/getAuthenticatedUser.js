import { jwtDecode } from 'jwt-decode';

export const getAuthenticatedUser = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const decoded = jwtDecode(token);

        return {
            id: decoded.id || decoded._id,
            firstName: decoded.firstName,
            role: decoded.role,
            // ... כל שדה נוסף בטוקן
        };
    } catch (error) {
        return null;
    }
};