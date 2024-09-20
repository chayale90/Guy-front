import React, { useEffect, useState } from 'react'
import { getDataFromServer } from '../../helpers/Api';
import UsersHeader from '../../components/UsersHeader';
import CategoryCards from '../../components/Food/CategoryCards';
import './HomePage.css'
import TableProductsTable from '../../components/Food/TableProductsTable';
import { preloadImages } from '../../utils/GetImageByCateogry';


const HomePage = () => {
    const [foodList, setFoodList] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredFoodList, setFilteredFoodList] = useState([]);
    const [userName, setUserName] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [clearSearch, setClearSearch] = useState(false);


    useEffect(() => {
        preloadImages();
    }, []);
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                if (parsedUser && typeof parsedUser === 'object' && 'firstName' in parsedUser) {
                    setUserName(parsedUser.firstName);
                } else {
                    console.log("Parsed User does not contain 'firstName' property");
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.log("No user data found in localStorage");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getDataFromServer('/food/category');
                setFoodCategory(response);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (isSearching) {
            const fetchFoodList = async () => {
                setIsLoading(true);
                try {
                    const response = await getDataFromServer('/food/foodList');
                    setFoodList(response);
                    setFilteredFoodList(response);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            };
            fetchFoodList();
        }
    }, [isSearching]);

    const handleBackToHome = () => {
        setIsSearching(false);
        setClearSearch(true);
        setTimeout(() => setClearSearch(false), 0);
    };


    return (
        <>
            <div dir='rtl' className='max-w-full p-5 bg-custom-whitesmoke lg:bg-white md:bg-white font-Assistant'>
                <div className='lg:flex lg:items-center lg:justify-center lg:text-center md:flex md:items-center md:justify-center md:text-center'>
                    <h1 className='text-[22px] lg:text-[25px] md:text-[25px] text-custom-blue break-words font-bold lg:mr-2'>
                        היי {userName && userName}
                    </h1>
                    <p className='text-black text-[22px] lg:text-[25px] md:text-[25px] break-words lg:mr-2 md:mr-2' style={{ fontWeight: 400 }}>
                        מה ברצונך לאכול היום?
                    </p>
                </div>
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
                                isLoading={isLoading}
                                showButtons={false}
                            />
                        )}
                    </>
                )}
                {!isSearching && (
                    <CategoryCards categoriesList={foodCategory} isLoading={isLoading} />
                )}
            </div>
        </>

    )
}

export default HomePage