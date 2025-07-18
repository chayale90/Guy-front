import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getDataFromServer } from '../../api/Api';
import FormTitle from '../../components/Form/FormTitle';
import TableProductsTable from '../../components/Food/TableProductsTable';
import { calculateCalories, checkCategoryCalories } from '../../utils/CheckFoodCalories';
import CategoryCards from '../../components/Food/CategoryCards';
import vegetablesImage from '/images/vegetables.webp';
import cerealsImage from '/images/cereals.webp';
import snackingImage from '/images/snacking.webp';
import oilImage from '/images/oil.webp';
import fruitsImage from '/images/fruits.webp';
import meatImage from '/images/meat.webp';
import milkImage from '/images/milk.webp';
import logo from '/images/guy_levi_logo.webp';
import Loader from '../../components/ui/Loader';



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
const CategoryPage = () => {
    const { categoryName } = useParams();
    const [foodList, setFoodList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [calories, setCalories] = useState(null);

    const categories = [
        { category: 'חלב מוצריו ותחליפיו', id: 1 },
        { category: 'דגנים וקטניות', id: 2 },
        { category: 'עוף בשר דגים ותחליפי חלבון מן הצומח', id: 3 },
        { category: 'שומנים', id: 4 },
        { category: 'ירקות', id: 5 },
        { category: 'פירות', id: 6 },
        { category: 'נשנושים', id: 7 },
    ];

    useEffect(() => {
        if (categoryName) {
            const decodedCategory = decodeURIComponent(categoryName);

            const fetchFilteredFood = async () => {
                setIsLoading(true);
                try {
                    let filteredFood = await getDataFromServer(`/food/foodlist?category=${decodedCategory}`);
                    filteredFood = filteredFood.sort((a, b) => {
                        const nameA = a.name.replace(/[\s-]/g, '');
                        const nameB = b.name.replace(/[\s-]/g, '');
                        return nameA.localeCompare(nameB, 'he', { sensitivity: 'base', ignorePunctuation: true });
                    });
                    setFoodList(filteredFood);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                    setIsLoading(false);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFilteredFood();
        }
    }, [categoryName]);


    return (
        <>
            <div className='relative lg:hidden md:hidden'>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative w-full h-48 overflow-hidden">
                    <img
                        src={checkCategory(categoryName)}
                        className="w-full h-full object-cover object-center"
                        loading='lazy'
                        alt="category"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                </div>

                <Link to={'/home'} className='p-2 text-white absolute top-10 right-2'>
                    <i className="fa-solid fa-chevron-right fa-2xl" style={{ boxShadow: "0px 1px 8.5px rgba(0, 0, 0, 0.25)" }}></i>
                </Link>

                <FormTitle className='text-[34px] font-Assistant text-white py-4 font-bold absolute bottom-0 right-3 break-words' text={categoryName}></FormTitle>
                <h3 dir='rtl' className='text-[14px] font-Assistant text-white py-2 mt-4 absolute bottom-[-0.5rem] font-normal right-3 break-words'>מנה = {checkCategoryCalories(categoryName)} קלוריות</h3>
            </div>

            {isLoading ? (<Loader />) : (
                <div className='min-w-full mx-auto bg-white p-3 lg:p-10 md:px-10 lg:max-w-4xl'>
                    <CategoryCards categoriesList={categories} categoryName={categoryName} isLoading={isLoading} isCarousel={true} />
                    <div dir='rtl' className='py-5 font-Assistant hidden lg:block md:block lg:px-32'>
                        <p className='text-custom-blue text-[40px] font-bold'>{categoryName}</p>
                        <p className='font-Assistant'>מנה = {checkCategoryCalories(categoryName)} קלוריות</p>
                    </div>

                    <div className='bg-custom-whitesmoke rounded-lg lg:mx-32 md:p-10 md:justify-center md:flex md:items-center lg:p-5 lg:justify-center lg:flex lg:items-center' style={{ boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.06)' }}>
                        <div className='text-center lg:w-full lg:max-w-md md:max-w-md md:w-full'>
                            <p className='text-center text-[20px] py-3 font-Assistant text-black font-bold lg:text-[32px] md:text-[32px]'>מחשבון גודל מנה במוצר סגור</p>
                            <p className='text-center text-[16px] lg:text-[24px] md:text-[18px] font-Assistant font-normal text-black break-words'>יש להזין אנרגיה (קלוריות) לקבלת גודל מנה</p>
                            <div className='w-full text-center flex py-4 justify-between lg:justify-center lg:items-center md:justify-center md:items-center md:mx-2'>
                                <div className='text-[16px] font-normal flex items-center mx-2'>
                                    <span className='rounded-lg border py-1.5 px-3 font-Assistant text-sm text-black border-[#D9D9D9] bg-transparent h-8 w-16 text-center'>
                                        {calories ? calculateCalories(categoryName, calories) : ''}
                                    </span>
                                    <span className='ml-2 lg:text-[20px] md:text-[20px] text-[#e30a0c]'>גרם למנה</span>
                                </div>

                                <div className='font-normal font-Assistant flex items-center'>
                                    <input
                                        type="number"
                                        min={1}
                                        className='rounded-lg border py-1 px-3 text-sm border-[#D9D9D9] bg-white w-20 h-8 font-Assistant'
                                        onChange={(e) => setCalories(e.target.value)}
                                    />
                                    <div className='ml-2 text-[16px] lg:text-[20px] md:text-[20px] text-custom-blue'>אנרגיה (קלוריות) ל100 גרם</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TableProductsTable foodList={foodList} filteredFoodList={foodList} />
                </div>
            )}

        </>
    )
}

export default CategoryPage