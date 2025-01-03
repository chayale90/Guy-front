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

const CategoryGrid = ({ categoriesList }) => {

    return (
        <div className='lg:max-w-screen-lg lg:mx-auto md:max-w-screen-md md:mx-auto p-4 lg:p-4 bg-[#FFFFFF]' dir='rtl'>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
                {

                    categoriesList.length > 0 && categoriesList.map((item, index) => (
                        <Link to={`/home/category/${item.category}`} key={index}>
                            <div className={`w-full min-h-full bg-white flex flex-col rounded-lg categoryCards ${index === 6 ? 'lg:mx-[22rem] md:mx-36 mx-20' : ''}`}>
                                <img
                                    src={checkCategory(item.category)}
                                    className='w-full lg:max-h-48 object-cover bg-center rounded-[18.51px] break-words'
                                    loading="lazy"
                                    alt={item.category}
                                />
                                <div className='flex justify-end'>
                                    <p className='text-black text-sm py-3 text-[14px] lg:text-[18px] md:text-[18px] lg:whitespace-nowrap font-Assistant break-words font-bold w-full mr-2 leading-5'>
                                        {item.category}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default CategoryGrid 