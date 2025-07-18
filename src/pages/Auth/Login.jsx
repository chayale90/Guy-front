import { useCallback, useEffect, useState } from 'react';
import { sendDataToServer } from '../../api/Api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../components/Form/FormInput';
import Loader from '../../components/ui/Loader';
import WhatsUppButton from '../../components/Form/WhatsUppButton';
import HeaderFormLogin from '../../components/Form/HeaderFormLogin';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { getAuthenticatedUser } from '../../utils/getAuthenticatedUser';




const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getAuthenticatedUser();
        if (user) {
            navigate(user.role === 'admin' ? '/admin' : '/home');
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "email" ? value.toLowerCase() : value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await sendDataToServer('/users/login', formData);
            toast.success('התחברת בהצלחה !');

            localStorage.setItem('token', response.token);

            const decodedToken = jwtDecode(response.token);

            if (decodedToken.firstName) {
                localStorage.setItem('username', decodedToken.firstName);
            }

            if (decodedToken.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    const togglePasswordVisibility = useCallback((e) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    }, []);

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-white md:bg-custom-categoryImage bg-cover bg-center">
            {/* Overlay - מוסתר במובייל */}
            <div className="hidden md:block absolute inset-0 bg-overlay-black bg-opacity-80"></div>

            {isLoading && <Loader />}

            <div
                className="relative flex flex-col items-center text-center mx-auto p-4 w-full sm:w-96 md:w-[420px] 
            bg-white md:bg-opacity-100 md:rounded-lg md:shadow-lg z-10 
            min-h-[50vh] md:min-h-[60vh] lg:min-h-[65vh] max-h-[90vh] overflow-auto"
                dir="rtl"
            >
                <HeaderFormLogin />

                {/* Form Section */}
                <div className="w-full flex flex-col py-2 flex-grow items-center justify-center">
                    <div className="space-y-3 w-full">
                        <form className="space-y-3 w-full" onSubmit={handleLogin}>
                            <div className='flex items-center justify-center w-full'>
                                <FormInput
                                    type="email"
                                    name="email"
                                    className="text-sm border font-Assistant border-gray-300 text-black rounded-full block w-full p-2"
                                    placeholder="אימייל"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <FormInput
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="text-sm border font-Assistant border-gray-300 text-black rounded-full block w-full p-2"
                                    placeholder="סיסמא"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 end-0 px-3 flex items-center text-gray-600"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white text-[18px] font-bold bg-custom-blue focus:outline-none rounded-full px-5 font-Assistant py-2"
                                disabled={isLoading}
                            >
                                {isLoading ? 'מתבצעת התחברות...' : 'כניסה'}
                            </button>

                            <div>
                                <Link to={'/signup'} className="font-Assistant text-lg text-[#e3090d]">
                                    להרשמה לחצו כאן
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* WhatsApp Button */}
                    <WhatsUppButton variant="login" />
                </div>
            </div>
        </div>
    )
}

export default Login