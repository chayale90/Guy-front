
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuthenticatedUser, sendDataToServer } from '../helpers/Api';

export const useAuth = () => {
    const navigate = useNavigate();

    const login = async (formData) => {
        try {
            await sendDataToServer('/users/login', formData);
            const user = await getAuthenticatedUser();
            if (!user) throw new Error('אימות נכשל');

            toast.success('התחברת בהצלחה!');
            navigate(user.role === 'admin' ? '/admin' : '/home');
        } catch (error) {
            toast.error(error.message || 'שגיאה בהתחברות');
            throw error; // כדי שתוכל לעשות setIsLoading(false) בקומפוננטה
        }
    };


    const checkAuth = async () => {
        try {
            const user = await getAuthenticatedUser();
            if (user) {
                navigate(user.role === 'admin' ? '/admin' : '/home');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return { login, checkAuth };
};