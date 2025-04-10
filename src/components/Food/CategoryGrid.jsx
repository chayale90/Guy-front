import { useMemo } from "react";
import { Link } from "react-router-dom";

const CategoryGrid = ({ categoriesList }) => {
    const mappedCategories = useMemo(() =>
        categoriesList.map(category => ({
            ...category,
        }))
        , [categoriesList]);
    return (
        <div className='lg:max-w-screen-lg lg:mx-auto md:max-w-screen-md md:mx-auto p-4 lg:p-4 bg-[#FFFFFF]' dir='rtl'>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
                {mappedCategories.length > 0 &&
                    mappedCategories.map((item, index) => (
                        <Link to={`/home/category/${item.category}`} key={index}>
                            <div className={`w-full bg-white flex flex-col rounded-lg categoryCards ${index === 6 ? 'lg:mx-[22rem] md:mx-36 mx-20' : ''}`}>
                                {/* עטיפת התמונה עם יחס גובה-רוחב שונה לכל מסך */}
                                <div className="w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/9] rounded-[18.51px] overflow-hidden">
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                        alt={item.category}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <p className="text-black text-sm py-3 text-[14px] lg:text-[18px] md:text-[18px] lg:whitespace-nowrap font-Assistant break-words font-bold w-full mr-2 leading-5">
                                        {item.category}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};
export default CategoryGrid 