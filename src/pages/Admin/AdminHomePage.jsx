import React, { useEffect, useState } from 'react'
import TableProductsTable from '../../components/Food/TableProductsTable'
import { getDataFromServer } from '../../helpers/Api'
import { Link } from 'react-router-dom'
import Loader from '../../components/ui/Loader'

const AdminHomePage = () => {
    const [foodList, setFoodList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredFoodList, setFilteredFoodList] = useState([]);
    const [searchInput, setSearchInput] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let response = await getDataFromServer('/food/foodlist');
                response = response.sort((a, b) => {
                    const nameA = a.name.replace(/[\s-]/g, '');
                    const nameB = b.name.replace(/[\s-]/g, '');
                    return nameA.localeCompare(nameB, 'he', { sensitivity: 'base', ignorePunctuation: true });
                });
                setFoodList(response);
                setFilteredFoodList(response);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchInput(searchTerm);
        if (!searchTerm) {
            setFilteredFoodList(foodList);
        } else {
            const filteredList = foodList.filter(food =>
                food.name.toLowerCase().includes(searchTerm)
            );
            setFilteredFoodList(filteredList);
        }
    };


    return (
        <>
            <div className='flex justify-between gap-1 items-center py-5 mx-auto max-w-full flex-wrap sticky top-0 bg-slate-100' dir='rtl'>
                <div className="flex items-center relative mx-3 rounded-md">
                    <input
                        type="text"
                        className="p-2 text-sm text-gray-700 border border-gray-300 rounded-md bg-gray-50 font-Assistant"
                        placeholder='חיפוש מאכלים...'
                        value={searchInput}
                        onChange={handleSearch}
                        style={{ width: 'auto' }}
                    />
                    <i className="fa-solid fa-magnifying-glass fa-sm text-gray-600 cursor-pointer absolute left-2" onClick={handleSearch}></i>
                </div>

                <Link to={{
                    pathname: '/admin/createfood',
                    state: { setFoodList }
                }} className="text-white bg-custom-blue font-medium rounded-lg p-2 ml-2 mr-3 flex items-center text-center">
                    <span className="text-sm font-Assistant">מאכל חדש</span>
                    <i className="fa-solid fa-utensils m-2 fa-sm text-center"></i>
                </Link>
            </div>

            {isLoading ? (<Loader />) : (
                <div className='min-w-full mx-auto py-8'>
                    <TableProductsTable foodList={filteredFoodList} setFoodList={setFoodList} filteredFoodList={filteredFoodList} searchInput={searchInput} showButtons={true} />
                </div>
            )}

        </>
    )
}

export default AdminHomePage