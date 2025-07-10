import React, { useEffect, useState } from 'react'
import { getDataFromServer } from '../../api/Api';
import CategoryCards from '../../components/Food/CategoryCards';
import TableProductsTable from '../../components/Food/TableProductsTable';
import UsersHeader from '../../components/Layout/UsersHeader';
import { categories } from '../../helpers/categories';
import Footer from '../../components/Layout/Footer';
import WelcomeUser from '../../components/Users/WelcomeUser';


const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [foodList, setFoodList] = useState([]);
    const [filteredFoodList, setFilteredFoodList] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [clearSearch, setClearSearch] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await getDataFromServer('/food/foodList');
                response = response.sort((a, b) => {
                    const nameA = a.name.replace(/[\s-]/g, '');
                    const nameB = b.name.replace(/[\s-]/g, '');
                    return nameA.localeCompare(nameB, 'he', { sensitivity: 'base', ignorePunctuation: true });
                });
                setFoodList(response);
                setFilteredFoodList(response);
            } catch (error) {
                console.error("Error fetching food list:", error);
            }
        };
        fetchData();
    }, []);


    const handleBackToHome = () => {
        setIsSearching(false);
        setClearSearch(true);
        setTimeout(() => setClearSearch(false), 0);
    };


    return (
        <>
            <div dir='rtl' className='max-w-full p-5 bg-custom-whitesmoke lg:bg-white md:bg-white font-Assistant'>
                <WelcomeUser />
                <div className='mt-4 lg:mt-0 lg:w-auto lg:text-center lg:justify-center lg:flex md:mt-0 md:w-auto md:text-center md:flex md:justify-center'>
                    <UsersHeader
                        foodList={foodList}
                        setFoodList={setFilteredFoodList}
                        setIsSearching={setIsSearching}
                        clearSearch={clearSearch}
                    />
                </div>
            </div>
            <div className='min-w-full mx-auto bg-white'>
                {isSearching && (
                    <>
                        {filteredFoodList.length === 0 ? (
                            <div className='flex flex-col items-center justify-center text-center py-0 p-5'>
                                <p className="text-red-500 text-center text-[18px] font-Assistant">
                                    המוצר לא נמצא
                                </p>
                                <p className='text-black text-center text-[18px] font-Assistant'>
                                    יש להיכנס לקבוצת המזון המתאימה ולהשתמש במחשבון
                                </p>
                                <button className='bg-custom-blue text-white p-2 text-[16px] font-thin rounded-lg mt-4 w-48' onClick={handleBackToHome}>
                                    חזרה לדף הבית
                                </button>
                            </div>
                        ) : (
                            <TableProductsTable
                                setFoodList={setFilteredFoodList}
                                foodList={filteredFoodList}
                                showButtons={false}
                            />
                        )}
                    </>
                )}
                {!isSearching && (
                    <CategoryCards categoriesList={categories} isCarousel={false} />
                )}
            </div>
            <Footer />
        </>
    )
}

export default HomePage