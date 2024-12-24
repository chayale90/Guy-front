import { useState } from 'react';
import { sendDataToServer } from '../../helpers/Api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../components/Form/FormInput';
import Loader from '../../components/Loader';
import WhatsUppButton from '../../components/Form/WhatsUppButton';
import HeaderFormLogin from '../../components/Form/HeaderFormLogin';
import GoogleButton from '../../components/Form/GoogleButton';
import { FaEyeSlash, FaEye } from "react-icons/fa";


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
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await sendDataToServer('/users/login', formData);
            toast.success('התחברת בהצלחה !');
            localStorage.setItem('user', JSON.stringify(response));

            if (response.role === 'admin') {
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

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }


    return (
        <div className="relative flex min-h-screen justify-center bg-white lg:bg-custom-categoryImage md:bg-custom-categoryImage bg-cover bg-center min-w-screen">
            <div className="lg:absolute lg:inset-0 lg:bg-overlay-black lg:bg-opacity-80 md:absolute md:inset-0 md:bg-overlay-black md:bg-opacity-80"></div>

            {isLoading && <Loader />}

            <div className="relative flex-col items-center text-center mx-auto p-4 w-full md:w-80 max-w-md bg-white md:bg-opacity-100 md:rounded-lg md:shadow-lg z-10 md:mt-0 overflow-y-auto md:top-5 md:absolute md:translate-x-[-50%] md:translate-y-0 md:left-1/2 md:transform md:px-6" dir="rtl">
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
                                    placeholder="כתובת E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='relative'>
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

                            <button type="submit" className="w-full text-white text-[20px] font-bold bg-custom-blue focus:outline-none rounded-full px-5 font-Assistant py-2">כניסה</button>
                            <div>
                                <Link to={'/signup'} className='font-Assistant text-sm text-custom-blue'>
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