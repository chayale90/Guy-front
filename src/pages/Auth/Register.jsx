import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../components/Form/FormInput';
import Loader from '../../components/Loader';
import WhatsUppButton from '../../components/Form/WhatsUppButton';
import HeaderFormLogin from '../../components/Form/HeaderFormLogin';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios';


const baseURL = import.meta.env.VITE_BASE_URL;
const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === "confirmPassword") {
            setErrorConfirmPassword(value !== formData.password);
        } else if (name === "password") {
            setErrorConfirmPassword(formData.confirmPassword && value !== formData.confirmPassword);
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Validate if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorConfirmPassword(true);
            toast.error('הסיסמאות אינן תואמות');
            return;
        }

        setErrorConfirmPassword(false);
        setIsLoading(true);

        try {
            const response = await axios.post(`${baseURL}/auth/register`, formData);

            if (response && !response.error) {
                toast.success('נרשמת בהצלחה! אנא התחבר');
                navigate('/');
            } else {
                toast.error(response.message || 'שגיאה בהרשמה');
            }
        } catch (error) {
            console.error('Error during registration:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message || 'שגיאה בהרשמה');
        } finally {
            setIsLoading(false);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }
    return (
        <div className="relative flex h-screen justify-center bg-white lg:bg-custom-categoryImage md:bg-custom-categoryImage bg-cover bg-center bg-fixed">
            {/* Overlay */}
            <div className="absolute inset-0 bg-overlay-black bg-opacity-80"></div>

            {isLoading && <Loader />}

            {/* Form Container */}
            <div
                className="relative flex-col items-center text-center mx-auto p-4 w-full md:w-80 max-w-md bg-white bg-opacity-100 lg:rounded-lg md:lg:rounded-lg shadow-lg z-10 overflow-y-auto"
                dir="rtl"
            >
                <HeaderFormLogin />

                <h1 className='font-Assistant text-[22px] font-medium'>הרשמה</h1>
                {/* Bottom Section */}
                <div className="w-full flex items-center justify-center py-4 relative">
                    <div className="space-y-2 w-full">
                        <form className="space-y-4" onSubmit={handleRegistration}>
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
                                    type="password"
                                    name="confirmPassword"
                                    className={`text-sm border font-Assistant rounded-full block w-full p-2 ${errorConfirmPassword ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="אשר סיסמא"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {errorConfirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">הסיסמאות אינן תואמות</p>
                                )}
                                <FormInput
                                    type="number"
                                    name="phoneNumber"
                                    className="text-sm border font-Assistant border-gray-300 text-black rounded-full block w-full p-2"
                                    placeholder="מספר פלאפון"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white text-lg font-bold bg-custom-blue rounded-full py-2"
                            >
                                הרשמה
                            </button>
                            <div>
                                <Link to="/" className="font-Assistant text-lg text-[#d13658]">
                                    להתחבר לחצו כאן
                                </Link>
                            </div>
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