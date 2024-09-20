import React from 'react'
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { deleteData } from '../../helpers/Api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const FoodCards = ({ foodList, isLoading, setFoodList, showButtons = true }) => {

    return (
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4' dir='rtl'>
            {isLoading ? <Loader /> : (
                foodList.length > 0 && foodList.map(food => (
                    <Link to={`/home/category/${food.category}`} key={food._id}>
                        <div key={food._id} className="max-w-sm bg-white rounded-lg shadow flex flex-col">

                            <img
                                src="https://cdn.exiteme.com/exitetogo/www.enerchi.co.il/userfiles/images/%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91.jpg"
                                className="w-full max-h-full object-cover rounded-lg"
                                alt="image"
                            />

                            <span className='text-black text-sm py-3 w-full px-3'>{food.name}</span>
                            {showButtons && (
                                <div className="flex justify-between items-center text-center w-full gap-2 p-2">
                                    <Link to={`/admin/editfood/${food._id}`} className="p-1 bg-yellow-400 text-sm rounded-md text-white w-1/2">
                                        <i className="fa-solid fa-pen-to-square m-1 fa-xs"></i>
                                    </Link>
                                    <button className="p-1 bg-red-500 text-sm rounded-md text-white w-1/2" onClick={() => deleteFood(food._id)}>
                                        <i className="fa-solid fa-trash-can m-1 fa-xs"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}

export default FoodCards;