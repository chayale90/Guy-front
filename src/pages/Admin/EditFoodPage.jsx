import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import FormTitle from '../../components/Form/FormTitle';
import FormInput from '../../components/Form/FormInput';
import FormSelectInput from '../../components/Form/FormSelectInput';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataFromServer, getDataFromServerAdmin, updateFoodToServer } from '../../helpers/Api';


const EditFoodPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [food, setFood] = useState({
        name: '',
        category: '',
        calories: '',
        unitsOfFood: '',

    });
    const [foodCategory, setFoodCategory] = useState([]);


    const { foodId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getDataFromServerAdmin(`/food/getfood/${foodId}`);
                const foodList = await getDataFromServer('/food/category');
                setFood(response);

                setFoodCategory(foodList)
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [foodId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateFoodToServer(`/food/updatefood/${foodId}`, food);
            setIsLoading(false);
            toast.success('עריכת מוצר בוצע בהצלחה')
            navigate('/admin');

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFood((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    return (
        <div className="flex items-center justify-center py-8">
            {isLoading && <Loader />}


            <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 w-full max-w-md" dir="rtl">
                <div className="w-full bg-white rounded-lg shadow">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <FormTitle className="font-bold text-black text-[24px] font-Assistant" text="עריכת מאכל" />
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <FormInput
                                    type="text"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 text-black font-Assistant text-[18px] rounded-lg  block w-full p-2.5"
                                    placeholder="שם המאכל"
                                    value={food.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <FormSelectInput name="category"
                                    value={food.category}
                                    onChange={handleChange}
                                    options={foodCategory} />
                            </div>
                            <div>
                                <FormInput
                                    type="number"
                                    name="calories"
                                    className="bg-gray-50 border border-gray-300 text-black font-Assistant text-[18px] rounded-lg block w-full p-2.5"
                                    placeholder="גרם למנה"
                                    value={food.calories}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <FormInput
                                    type="text"
                                    name="unitsOfFood"
                                    className="bg-gray-50 border border-gray-300 text-black font-Assistant text-[18px] rounded-lg block w-full p-2.5"
                                    placeholder="יחידות"
                                    value={food.unitsOfFood}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-custom-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-Assistant rounded-lg text-[18px] px-5 py-2.5 text-center">ערוך מאכל</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditFoodPage;