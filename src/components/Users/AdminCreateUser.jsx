import { useState } from 'react';
import FormInput from '../../components/Form/FormInput';
import FormTitle from '../../components/Form/FormTitle';
import Loader from '../ui/Loader';
import { toast } from 'react-toastify';
import { sendDataToServerAdmin } from '../../helpers/Api';
import { useLocation, useNavigate } from 'react-router-dom';


const AdminCreateUser = () => {

    const location = useLocation();
    const { setUsers } = location.state || {};

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const newUser = await sendDataToServerAdmin('/users/register', formData);
            if (newUser && newUser.email && newUser.password) {
                if (setUsers) {
                    setUsers((prevUsers) => [...prevUsers, newUser]);
                }
                toast.success('! משתמש נוצר בהצלחה');
                setFormData(initialFormData);
                navigate('/admin/users')
            } else {
                toast.error('Failed to create user. Please try again.');
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };
    return (
        <div className="flex items-center justify-center py-8">
            {isLoading && <Loader />}
            <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 w-full max-w-md" dir="rtl">
                <div className="w-full bg-white rounded-lg shadow">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <FormTitle className="text-xl font-bold text-black md:text-2xl font-Assistant text-[18px]" text="משתמש חדש" />
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div>
                                <FormInput
                                    type="text"
                                    name="firstName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="שם מלא"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="lastName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="שם משפחה"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="אימייל"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="סיסמא"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-custom-blue focus:outline-none font-normal font-Assistant text-[20px] rounded-lg text-sm px-5 py-2.5 text-center">צור משתמש</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCreateUser