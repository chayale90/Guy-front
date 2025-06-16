import React, { useEffect, useState } from 'react'
import AdminUsersTable from '../../components/Users/AdminUsersTable'
import { getDataFromServerAdmin } from '../../helpers/Api'
import Loader from '../../components/ui/Loader'
import { Link } from 'react-router-dom'

const AdminUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getDataFromServerAdmin('/users/admin');
                setUsers(response)
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='container mx-auto py-8'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='flex flex-end mb-1'>
                        <Link to={{
                            pathname: '/admin/createuser',
                            state: { setUsers }
                        }} users={users} className="text-white bg-custom-blue font-Assistant text-[16px] mr-4 rounded-lg p-2 text-center ml-auto">
                            <i className="fa-solid fa-plus m-1 fa-sm text-center"></i>
                            צור משתמש חדש
                        </Link>
                    </div>
                    <AdminUsersTable users={users} setUsers={setUsers} />
                </>
            )}
        </div>
    )
}

export default AdminUsers;