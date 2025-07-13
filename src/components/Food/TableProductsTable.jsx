import TableHeader from '../Users/TableHeader';
import { Link } from 'react-router-dom';
import { deleteData } from '../../api/Api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from '../ui/Loader';


const MySwal = withReactContent(Swal);

const TableProductsTable = ({ foodList, setFoodList, filteredFoodList, searchInput, showButtons = false }) => {

    const headers = ['מזון', 'גרם למנה', 'יחידה למנה', ...(showButtons ? ['פעולות'] : [])];


    const deleteFood = async (foodId) => {
        try {
            const result = await MySwal.fire({
                title: "?למחוק פריט זה",
                text: "!את/ה לא תוכל לשחזר את זה",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "כן, מחק מאכל"
            });

            if (result.isConfirmed) {
                const response = await deleteData(`/food/deletefood/${foodId}`);
                if (response.status === 200) {
                    MySwal.fire({
                        title: "!נמחק",
                        text: "מאכל נמחק בהצלחה",
                        icon: "success"
                    });
                    setFoodList(prevList => prevList.filter(food => food._id !== foodId));
                } else {
                    MySwal.fire({
                        title: "שגיאה",
                        text: "התרחשה שגיאה במחיקת המאכל",
                        icon: "error"
                    });
                }
            }
        } catch (error) {
            MySwal.fire({
                title: "שגיאה",
                text: "התרחשה שגיאה במחיקת המאכל",
                icon: "error"
            });
        }
    };

    if (!foodList) return <Loader />


    return (
        <div className="overflow-x-auto max-h-[650px] md:min-h-screen overflow-y-auto min-w-full lg:px-32" dir='rtl'>
            <table className="min-w-full border-collapse table-fixed">
                <TableHeader headers={headers} />
                <tbody className="overflow-y-auto">
                    {foodList?.length > 0 && foodList.map(food => {
                        const isHighlighted = filteredFoodList?.some(filteredFood => filteredFood._id === food._id);

                        return (
                            <tr
                                key={food._id}
                                className={`bg-white border-b border-b-slate-100 ${isHighlighted && searchInput ? 'bg-[#E4FC5B]' : ''}`}
                            >
                                <th
                                    scope="row"
                                    className="px-2 py-2 text-black font-Assistant font-normal text-[16px] break-words"
                                >
                                    {food.name}
                                </th>
                                <th
                                    scope="row"
                                    className="px-4 py-2 text-black font-Assistant font-normal text-[16px] break-words"
                                >
                                    {food.calories ? `${food.calories}` : ""}
                                </th>
                                <th
                                    scope="row"
                                    className="px-4 py-2 text-black font-Assistant font-normal text-[16px] break-words "
                                >
                                    {food.unitsOfFood}
                                </th>
                                {showButtons && (
                                    <td className="flex justify-between items-center text-center gap-2 p-2">
                                        <Link to={`/admin/editfood/${food._id}`} className="p-1 bg-custom-blue text-sm rounded-md text-white w-1/2">
                                            <i className="fa-solid fa-pen-to-square m-1 fa-xs"></i>
                                        </Link>
                                        <button className="p-1 bg-red-500 text-sm rounded-md text-white w-1/2" onClick={() => deleteFood(food._id)}>
                                            <i className="fa-solid fa-trash-can m-1 fa-xs"></i>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableProductsTable