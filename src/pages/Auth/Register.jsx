import { useState } from 'react';
import { sendDataToServer } from '../../helpers/Api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../components/Form/FormInput';
import Loader from '../../components/Loader';
import WhatsUppButton from '../../components/Form/WhatsUppButton';
import HeaderFormLogin from '../../components/Form/HeaderFormLogin';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
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
            const response = await sendDataToServer('/users/register', formData);

            // Check if response has data and no error
            if (response && !response.error) {
                localStorage.setItem('user', JSON.stringify(response));
                toast.success('נרשמת בהצלחה !');
                navigate('/home');
            } else {
                toast.error(response.message || 'שגיאה בהרשמה');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'שגיאה בהרשמה');
        } finally {
            setIsLoading(false);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }
    return (
        <div className="relative flex h-screen justify-center bg-white lg:bg-custom-categoryImage md:bg-custom-categoryImage bg-cover bg-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-overlay-black bg-opacity-80"></div>

            {isLoading && <Loader />}

            {/* Form Container */}
            <div
                className="relative flex-col items-center text-center mx-auto p-4 w-full md:w-80 max-w-md bg-white md:bg-opacity-100 md:rounded-lg md:shadow-lg z-10 md:mt-0 overflow-y-auto md:top-5 md:absolute md:translate-x-[-50%] md:translate-y-0 md:left-1/2 md:transform md:px-6"
                dir="rtl"
            >
                <HeaderFormLogin />

                {/* Bottom Section */}
                <div className="w-full flex items-center justify-center py-4 relative">
                    <div className="space-y-2 w-full">
                        <form className="space-y-4" onSubmit={handleLogin}>
                            {/* Input Fields */}
                            <div className="space-y-4" dir="rtl">
                                <FormInput
                                    type="text"
                                    name="firstName"
                                    className="text-sm border font-Assistant border-gray-300 text-black rounded-full block w-full p-2"
                                    placeholder="שם מלא"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <FormInput
                                    type="text"
                                    name="lastName"
                                    className="text-sm border font-Assistant border-gray-300 text-black rounded-full block w-full p-2"
                                    placeholder="שם משפחה"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                                <FormInput
                                    type="email"
                                    name="email"
                                    className="text-sm border font-Assistant border-gray-300 text-black rounded-full block w-full p-2"
                                    placeholder="כתובת E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="relative">
                                    <FormInput
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="text-sm border font-Assistant border-gray-300 text-black rounded-full block w-full p-2 pr-10"
                                        placeholder="סיסמא"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <FormInput
                                    type="number"
                                    name="phoneNumber"
                                    className="text-sm border font-Assistant border-gray-300 text-black rounded-full block w-full p-2"
                                    placeholder="מספר פלאפון"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Link to="/" className="font-Assistant text-sm text-custom-blue">
                                    להתחבר לחץ כאן
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white text-lg font-bold bg-custom-blue rounded-full py-2"
                            >
                                כניסה
                            </button>
                        </form>
                    </div>

                    {/* WhatsApp Button */}
                    <WhatsUppButton />
                </div>
            </div>
        </div>
    )
}

export default Register