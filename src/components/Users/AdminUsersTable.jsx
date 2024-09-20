import FormTitle from '../Form/FormTitle'
import TableHeader from './TableHeader'
import { updateDataToServer } from '../../helpers/Api';
import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
import Loader from '../Loader';



const AdminUsersTable = ({ users, setUsers }) => {

    const [loadingUserIds, setLoadingUserIds] = useState([]);

    const handleBlock = useCallback(async (userId) => {
        setLoadingUserIds((prev) => [...prev, userId]);
        try {
            const response = await updateDataToServer(`/users/admin/deactivate/${userId}`);
            const updatedUser = response.user;
            if (updatedUser) {

                setUsers((prevUsers) =>
                    prevUsers.map(user =>
                        user._id === updatedUser._id ? { ...user, isActive: updatedUser.isActive } : user
                    )
                );
                toast.success('משתמש נחסם בהצלחה');
            }
        } catch (error) {
            toast.error('Failed to block user. Please try again.');
        } finally {
            setLoadingUserIds((prev) => prev.filter(id => id !== userId));
        }
    }, [setUsers]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {loadingUserIds.length > 0 && <Loader />}
            <div className="py-4 text-2xl text-center">
                <FormTitle text="משתמשים" />
            </div>
            <div className="scroll">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500" dir='rtl'>
                    <TableHeader headers={['#', 'שם מלא', 'שם משפחה', 'אימייל', 'סיסמא', 'חסימת משתמש',]} />
                    <tbody>
                        {
                            users.length > 0 && users.map((user, index) => (
                                <tr key={user._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b ">
                                    <td className="px-6 py-4 font-medium text-black font-Assistant text-[18px] whitespace-nowrap">
                                        {index + 1}.
                                    </td>
                                    <td className="px-6 py-4 font-normal text-black font-Assistant text-[18px] whitespace-nowrap">
                                        {user.firstName}
                                    </td>
                                    <td className="px-6 py-4 text-black font-Assistant text-[18px]">
                                        {user.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-black font-Assistant text-[18px]">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-black font-Assistant text-[18px]">
                                        {user.password}
                                    </td>
                                    <td className="px-6 py-4 text-black font-Assistant text-[18px]">
                                        {loadingUserIds.includes(user._id) ? (
                                            <Loader />
                                        ) : (
                                            user.isActive ? (
                                                <button type='button' className="font-medium text-blue-600" onClick={() => handleBlock(user._id)}>
                                                    חסום משתמש
                                                </button>
                                            ) : (
                                                <span className="font-medium text-red-600">
                                                    משתמש חסום
                                                    <i className="fa-solid fa-ban m-1"></i>
                                                </span>
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsersTable