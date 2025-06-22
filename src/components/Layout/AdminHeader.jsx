import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../helpers/Api';

const AdminHeader = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="bg-custom-header-bg shadow-md sticky top-0 z-50">
            <div className="max-w-screen-xl relative mx-auto px-4 py-3 flex items-center" dir="rtl">

                {/* צד ימין: תפריט בדסקטופ */}
                <div className="hidden md:flex items-center gap-6 font-Assistant">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[#e30a0c] font-bold hover:text-red-600 transition"
                    >
                        <FiLogOut size={20} color="blue" />
                        התנתקות
                    </button>
                    <Link to="/admin/users" className="text-black text-lg hover:text-custom-blue transition">משתמשים</Link>
                    <Link to="/admin" className="text-black text-lg hover:text-custom-blue transition">מאכלים</Link>
                </div>

                {/* כותרת במרכז במסכים גדולים */}
                <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-custom-blue font-Assistant">
                    לוח ניהול
                </div>

                {/* כפתור תפריט נפתח למובייל - בצד ימין במובייל */}
                <div className="md:hidden ml-auto">
                    <button
                        onClick={toggleCollapse}
                        className="text-custom-blue p-2 rounded-lg transition hover:bg-blue-100"
                        aria-label="פתח תפריט"
                    >
                        {isCollapsed ? (
                            <i className="fa-solid fa-x fa-lg"></i>
                        ) : (
                            <i className="fa-solid fa-bars fa-xl"></i>
                        )}
                    </button>
                </div>
            </div>

            {/* תפריט במובייל */}
            <div className={`md:hidden px-4 ${isCollapsed ? 'block' : 'hidden'}`} dir="rtl">
                <ul className="flex flex-col gap-4 py-4 font-Assistant text-right">
                    <Link to="/admin/users" className="text-black text-lg hover:text-custom-blue transition">משתמשים</Link>
                    <Link to="/admin" className="text-black text-lg hover:text-custom-blue transition">מאכלים</Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[#e30a0c] font-bold hover:text-red-600 transition"
                    >
                        <FiLogOut size={20} />
                        התנתקות
                    </button>
                </ul>
            </div>
        </nav>
    )
}

export default AdminHeader;