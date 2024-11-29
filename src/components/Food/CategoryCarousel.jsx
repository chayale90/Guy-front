import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import vegetablesImage from '/images/ירקות.webp';
import cerealsImage from '/images/דגנים.webp';
import snackingImage from '/images/נשנושים.webp';
import oilImage from '/images/שמנים.webp';
import fruitsImage from '/images/פירות.webp';
import meatImage from '/images/חלבון.webp';
import milkImage from '/images/חלב.webp';
import logo from '/images/guy_levi_logo.webp';

const checkCategory = (categoryName) => {
    switch (categoryName) {
        case 'ירקות': return vegetablesImage;
        case 'דגנים וקטניות': return cerealsImage;
        case 'חלב מוצריו ותחליפיו': return milkImage;
        case 'נשנושים': return snackingImage;
        case 'פירות': return fruitsImage;
        case 'עוף בשר דגים ותחליפי חלבון מן הצומח': return meatImage;
        case 'שומנים': return oilImage;
        default: return logo;
    }
};

const CategoryCarousel = ({ categoriesList, categoryName }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const index = categoriesList.findIndex(item => item.category === categoryName);
        if (index !== -1) {
            setCurrentIndex(index);
        }
    }, [categoryName, categoriesList]);

    const handlePrevClick = () => {
        const newIndex = (currentIndex === 0) ? categoriesList.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNextClick = () => {
        const newIndex = (currentIndex === categoriesList.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const getVisibleItems = () => {
        if (categoriesList.length <= 5) {
            return categoriesList;
        }

        let visibleItems = [];
        const startIndex = currentIndex - 2;
        const endIndex = currentIndex + 2;

        for (let i = startIndex; i <= endIndex; i++) {
            let index = i;

            if (i < 0) {
                index = categoriesList.length + i;
            } else if (i >= categoriesList.length) {
                index = i - categoriesList.length;
            }

            visibleItems.push(categoriesList[index]);
        }

        return visibleItems;
    };

    const visibleItems = getVisibleItems();

    return (
        <div className='hidden lg:block md:block'>
            <div className='relative flex items-center bg-white p-10 lg:mx-20 md:px-0 md:p-5' dir='rtl'>
                <button
                    className='absolute left-[6rem] md:left-[-2rem] bg-gray-300 p-2'
                    onClick={handlePrevClick}
                    style={{
                        width: '35px',
                        height: '40px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        background: 'rgba(30, 24, 222, 0.03)',
                        zIndex: 2,
                    }}
                >
                    <div
                        style={{
                            width: '13px',
                            height: '13px',
                            borderTop: '2px solid #1E18DE',
                            borderRight: '2px solid #1E18DE',
                            transform: 'rotate(-135deg)',
                        }}
                    />
                </button>
                <div className='flex overflow-hidden gap-1 md:gap-0 w-full mx-20 md:justify-center md:mx-0 p-10 md:p-2'>
                    {visibleItems.map((item, index) => {
                        const isCenterCard = (index === Math.floor(visibleItems.length / 2));

                        return (
                            <Link
                                to={`/home/category/${item.category}`}
                                key={item.category}
                                className={`p-3 lg:p-4 transition-transform duration-300 ease-in-out ${isCenterCard ? 'scale-110' : 'scale-90'}`}
                                style={{
                                    transform: isCenterCard ? 'scale(1.2)' : 'scale(1)',
                                }}
                            >
                                <div className='w-full md:min-w-28 lg:max-h-48 min-h-full max-h-full flex flex-col rounded-lg overflow-hidden categoryCards'>
                                    <img
                                        src={checkCategory(item.category)}
                                        className={`w-full h-full object-cover bg-center break-words shadow-lg`}
                                        alt={item.category}
                                    />
                                    <div className="flex justify-end bg-[#FFFFFF] mb-5">
                                        <p
                                            className='text-black max-w-full p-2 text-[16px] md:text-[16px] font-fb-optimum font-bold w-full mr-2 leading-4 '
                                        >
                                            {item.category}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <button
                    className='absolute right-[6rem] md:right-[-2rem] bg-gray-300 p-3'
                    onClick={handleNextClick}
                    style={{
                        width: '35px',
                        height: '40px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        background: 'rgba(30, 24, 222, 0.03)',
                        zIndex: 2,
                    }}
                >
                    <div
                        style={{
                            width: '13px',
                            height: '13px',
                            borderTop: '2px solid #1E18DE',
                            borderRight: '2px solid #1E18DE',
                            transform: 'rotate(45deg)',
                        }}
                    />
                </button>
            </div>
        </div>

    );
}

export default CategoryCarousel