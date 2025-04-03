import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../ui/Loader';
import FormInput from '../Form/FormInput';
import FormSelectInput from '../Form/FormSelectInput';
import FormTitle from '../Form/FormTitle';
import { sendDataToServerAdmin } from '../../helpers/Api';
import { toast } from 'react-toastify';

const CreateFoodForm = () => {
    const location = useLocation();
    const { setFoodList } = location.state || {};

    const initialFormData = {
        name: '',
        category: '',
        calories: '',
        unitsOfFood: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);

    const foodCategory = [
        { category: 'חלב מוצריו ותחליפיו', id: 1 },
        { category: 'דגנים וקטניות', id: 2 },
        { category: 'עוף בשר דגים ותחליפי חלבון מן הצומח', id: 3 },
        { category: 'שומנים', id: 4 },
        { category: 'ירקות', id: 5 },
        { category: 'פירות', id: 6 },
        { category: 'נשנושים', id: 7 },
    ];

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newFood = await sendDataToServerAdmin('/food/createFood', formData);
            if (newFood) {
                if (setFoodList) {
                    setFoodList((prevFood) => [...prevFood, newFood]);
                }
                toast.success('! מאכל נוסף בהצלחה');
                setFormData(initialFormData);
                navigate('/admin')
            } else {
                toast.error('שגיאה בהוספת מאכל');
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
                        <FormTitle className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl " text="הוספת מאכל חדש" />
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <FormInput
                                    type="text"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                    placeholder="שם המאכל"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <FormSelectInput name="category" value={formData.category} onChange={handleChange} options={foodCategory} />
                            </div>
                            <div>
                                <FormInput
                                    type="number"
                                    name="calories"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="גרם למנה"
                                    value={formData.calories}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="unitsOfFood"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="יחידות"
                                    value={formData.unitsOfFood}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-custom-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-[18px] font-Assistant px-5 py-2.5 text-center">צור מאכל </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFoodForm