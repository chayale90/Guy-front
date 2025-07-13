import FormTitle from '../Form/FormTitle'
import TableHeader from './TableHeader'
import { updateDataToServer } from '../../api/Api';
import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
import Loader from '../ui/Loader';



const AdminUsersTable = ({ users, setUsers }) => {

    const [loadingUserIds, setLoadingUserIds] = useState([]);

    const handleBlockToggle = useCallback(async (user) => {
        setLoadingUserIds(prev => [...prev, user._id]);
        try {
            const response = await updateDataToServer(`/users/admin/toggleUserActiveStatus/${user._id}`);
            const updatedUser = response.user;
            if (updatedUser) {
                setUsers(prevUsers =>
                    prevUsers.map(u =>
                        u._id === updatedUser._id ? { ...u, isActive: updatedUser.isActive } : u
                    )
                );
                toast.success(`משתמש ${updatedUser.isActive ? 'פעיל' : 'נחסם'} בהצלחה`);
            }
        } catch (error) {
            toast.error('Failed to toggle user status. Please try again.');
        } finally {
            setLoadingUserIds(prev => prev.filter(id => id !== user._id));
        }
    }, [setUsers]);


    return (
        <div className="overflow-x-auto max-h-[650px] md:min-h-screen overflow-y-auto">
            {loadingUserIds.length > 0 && <Loader />}
            <div className="py-4 text-2xl" dir='rtl'>
                <FormTitle text="משתמשים" />
            </div>
            <div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500" dir='rtl'>
                    <TableHeader headers={['#', 'שם מלא', 'אימייל', 'סיסמא', 'פלאפון', 'חסימת משתמש',]} />
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
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-black font-Assistant text-[18px]">
                                        {user.password}
                                    </td>
                                    <td className="px-6 py-4 text-black font-Assistant text-[18px]">
                                        {user.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 text-black font-Assistant text-[18px]">
                                        {loadingUserIds.includes(user._id) ? (
                                            <Loader />
                                        ) : (
                                            user.isActive ? (
                                                <button type='button' className="font-medium text-blue-600" onClick={() => handleBlockToggle(user)}>
                                                    חסום משתמש
                                                </button>
                                            ) : (
                                                <button type='button' className="font-medium text-red-600" onClick={() => handleBlockToggle(user)}>
                                                    משתמש חסום
                                                    <i className="fa-solid fa-ban m-1"></i>
                                                </button>

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