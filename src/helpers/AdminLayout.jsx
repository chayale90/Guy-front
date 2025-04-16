import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/Layout/AdminHeader';

const AdminLayout = () => {
    return (
        <>
            <header>
                <AdminHeader />
            </header>
            <div className='mx-auto'>
                <Outlet />
            </div>
        </>
    )
}

export default AdminLayout