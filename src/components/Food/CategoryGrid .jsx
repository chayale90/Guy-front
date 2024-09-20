import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { checkCategory, preloadImages } from '../../utils/GetImageByCateogry';
import Loader from '../Loader'

const CategoryGrid = ({ categoriesList, isLoading }) => {
    useEffect(() => {
        preloadImages();
    }, []);
    return (
        <div className='lg:max-w-screen-lg lg:mx-auto md:max-w-screen-md md:mx-auto md:grid-cols-3 grid grid-cols-2 p-4 lg:grid-cols-3 gap-3 lg:gap-8 lg:p-4 bg-[#FFFFFF]' dir='rtl'>
            {isLoading ? <Loader /> : (
                categoriesList.length > 0 && categoriesList.map((item, index) => (
                    <Link to={`/home/category/${item.category}`} key={index}>
                        <div className="w-full min-h-full bg-white flex flex-col rounded-lg categoryCards">
                            <img
                                src={checkCategory(item.category)}
                                className='w-full lg:max-h-48 object-cover bg-center rounded-[18.51px] break-words'
                                loading="lazy"
                                alt={item.category}
                            />
                            <div className='flex justify-end'>
                                <p className='text-black text-sm py-3 text-[14px] lg:text-[18px] lg:whitespace-nowrap font-Assistant break-words font-bold w-full mr-2 leading-5'>
                                    {item.category}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}
export default CategoryGrid 