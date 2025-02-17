import { useCallback, useState } from 'react';
import { sendDataToServer } from '../../helpers/Api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../components/Form/FormInput';
import Loader from '../../components/Loader';
import WhatsUppButton from '../../components/Form/WhatsUppButton';
import HeaderFormLogin from '../../components/Form/HeaderFormLogin';
import GoogleButton from '../../components/Form/GoogleButton';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";


const baseURL = import.meta.env.VITE_BASE_URL;

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "email" ? value.toLowerCase() : value,
        }));
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await sendDataToServer('/users/login', formData);
            toast.success('התחברת בהצלחה !');

            localStorage.setItem('username', response.firstName);
            localStorage.setItem('token', response.token);

            const decodedToken = jwtDecode(response.token);
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



    const handleGoogleLogin = () => {
        window.location.href = `${baseURL}/users/google`;
    };

    const togglePasswordVisibility = useCallback((e) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    }, []);

    return (
        <div className="relative flex min-h-screen justify-center bg-white lg:bg-custom-categoryImage md:bg-custom-categoryImage bg-cover bg-center">
            <div className="lg:absolute lg:inset-0 lg:bg-overlay-black lg:bg-opacity-80 md:absolute md:inset-0 md:bg-overlay-black md:bg-opacity-80"></div>

            {isLoading && <Loader />}

            <div
                className="relative flex flex-col items-center text-center mx-auto p-4 w-full md:w-80 max-w-md bg-white md:bg-opacity-100 md:rounded-lg md:shadow-lg z-10 md:my-8 md:px-6"
                dir="rtl"
            >
                <HeaderFormLogin />
                {/* Bottom Section */}
                <div className="w-full flex items-center justify-center md:py-0 lg:py-0">
                    <div className="space-y-2 w-full">
                        <GoogleButton handleGoogleLogin={handleGoogleLogin} />
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div className="flex items-center justify-center w-full">
                                <div className="flex-1 h-0.5 border-t border-[#F2F2F2]"></div>
                                <span className="mx-4 text-black font-light font-Assistant text-[18.82px]">או</span>
                                <div className="flex-1 h-0.5 border-t border-[#F2F2F2]"></div>
                            </div>

                            <div>
                                <FormInput
                                    type="email"
                                    name="email"
                                    className="text-[16px] border font-Assistant border-gray-300 text-black placeholder:font-light rounded-full block w-full p-2 placeholder:text-[#B5B5B5] placeholder:font-Assistant"
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
                                    className="text-[16px] border font-Assistant border-gray-300 text-black placeholder:font-light rounded-full block w-full p-2 placeholder:text-[#B5B5B5] placeholder:font-Assistant"
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
                                className="w-full text-white text-[20px] font-bold bg-custom-blue focus:outline-none rounded-full px-5 font-Assistant py-2"
                                disabled={isLoading}
                            >   {isLoading ? 'מתבצעת התחברות...' : 'כניסה'}</button>
                            <div>
                                <Link to={'/signup'} className="font-Assistant text-lg text-[#d13658]">
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