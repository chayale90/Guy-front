import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Outlet } from 'react-router-dom'

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