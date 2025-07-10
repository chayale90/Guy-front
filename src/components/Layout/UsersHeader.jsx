import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../lotties/animation-lottie.json';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { CgLogOut } from "react-icons/cg";
import { logout } from '../../api/Api';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const UsersHeader = ({ foodList, setFoodList, setIsSearching, clearSearch }) => {
    const [searchInput, setSearchInput] = useState('');
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (clearSearch) {
            setSearchInput('');
            setFoodList([]);
            setNoResults(false);
        }
    }, [clearSearch, setFoodList]);


    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchInput(searchTerm);

        if (!searchTerm) {
            setFoodList([]);
            setIsSearching(false);
            setNoResults(false);
        } else {
            setIsSearching(true);
            const filteredList = foodList.filter(food =>
                food.name.toLowerCase().startsWith(searchTerm)
            );
            setFoodList(filteredList);
            setNoResults(filteredList.length === 0);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <section className="mt-5">
            {/* Profile Icon (only on small screens) */}
            <div className="absolute left-5 top-1 flex flex-row gap-2 md:hidden lg:hidden">
                <Link to="/profile" className="p-2 flex flex-col items-center py-3">
                    <FaUser size={22} color="#433eea" />
                    <span className="font-Assistant font-normal text-[#e30a0c]">איזור אישי</span>
                </Link>
                <button onClick={handleLogout} className="p-2 flex flex-col items-center">
                    <CgLogOut size={26} color="#433eea" />
                    <span className="font-Assistant font-normal text-[#e30a0c]">יציאה</span>
                </button>
            </div>
            <div className="relative flex flex-col md:flex-row items-center" dir='rtl'>
                <input
                    dir='rtl'
                    type="search"
                    name="search"
                    value={searchInput}
                    onChange={handleSearch}
                    placeholder="חיפוש מוצר"
                    className="bg-white md:w-64 lg:w-72 w-full p-1 rounded-full px-8 text-[16px] border border-[#D9D9D9] lg:text-[20px] text-black font-normal focus:outline-none font-Assistant lg:placeholder:text-[#D9D9D9] lg:placeholder:font-extralight placeholder:text-[#D9D9D9] placeholder:font-Assistant"
                    autoComplete="off"
                    spellCheck="false"
                />
                <CiSearch className='absolute lg:bottom-2 right-3 bottom-2 text-[#D9D9D9]' />
            </div>
            {noResults && (
                <Lottie
                    options={defaultOptions}
                    height={200}
                    width={200}
                />
            )}
        </section>
    );
};

export default UsersHeader