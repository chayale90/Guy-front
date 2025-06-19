import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthenticatedUser, getDataFromServer, updateData } from "../../helpers/Api";
import { formatDate } from "../../helpers/dateFormatter";
import WeightStatistics from "../../components/chart/WeightStatistics";
import WeightChart from "../../components/chart/WeightChart";
import { toast } from "react-toastify";


const ProfilePage = () => {
    const [weights, setWeights] = useState([]);
    const [showWeightModal, setShowWeightModal] = useState(false);
    const [newWeight, setNewWeight] = useState('');

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getAuthenticatedUser();

            if (user && user.id) {
                setUserId(user.id);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;

            try {
                let response = await getDataFromServer(`/auth/user-weight/${userId}`);
                const formattedData = response.map(item => ({
                    date: formatDate(item.updatedWeight),
                    weight: item.myWeight
                }));
                setWeights(formattedData);
            } catch (error) {
                toast.error(error?.msg || "שגיאה בקבלת משקל");
            }
        };
        fetchData();
    }, [userId]);

    const labels = weights.map(w => w.date);

    const data = {
        labels,
        datasets: [
            {
                label: "המשקל שלי",
                data: weights.map(w => w.weight),
                backgroundColor: "#e3090d",
                borderColor: "#1f18de",
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                display: false,
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x",
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "x",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
            y: {
                min: 40,
                max: 200,
                ticks: {
                    stepSize: 10,
                },
                title: {
                    display: true,
                    text: "משקל (kg)",
                },
            },
        },
    };

    const handleAddWeight = async () => {
        if (!userId || !newWeight) return;

        if (isNaN(newWeight) || newWeight < 40 || newWeight > 200) {
            toast.error('משקל אינו תקין');
            return;
        }
        try {
            const response = await updateData('/auth/update-weight', {
                userId,
                newWeight
            });

            if (response) {
                const formattedDate = formatDate(new Date());

                setWeights([...weights, { date: formattedDate, weight: newWeight }]);
                setNewWeight('');
                setShowWeightModal(false);
                toast.success('משקל עודכן בהצלחה');
            }
        } catch (error) {
            toast.error(error?.msg || "Error updating weight");
        }
    }

    const currentWeight = weights[weights.length - 1]?.weight || 0;
    const initialWeight = weights[0]?.weight || 0;
    const weightChange = currentWeight - initialWeight;

    return (
        <div className="container mx-auto p-4 relative">
            <Link to={'/home'} className='p-3 text-black top-0 left-2'>
                <i className="fa-solid fa-chevron-left fa-xl" style={{ boxShadow: "0px 1px 8.5px rgba(0, 0, 0, 0.25)" }}></i>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weight Chart */}
                <div>
                    <WeightChart
                        data={weights.length > 0 ? data : { labels: [""], datasets: [{ label: "משקל", data: [0] }] }}
                        options={options}
                    />
                </div>

                {/* Weight Statistics */}
                <WeightStatistics
                    currentWeight={currentWeight}
                    weightChange={weightChange}
                    onAddWeightClick={() => setShowWeightModal(true)}
                />
            </div>
            {/* Weight Modal */}
            {showWeightModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full" dir="rtl">
                        <h2 className="text-xl font-bold mb-4 text-center">הוספת משקל חדש</h2>

                        <div className="mb-4">
                            <label htmlFor="weight" className="block text-gray-700 font-bold mb-2">
                                המשקל שלך (בק"ג)
                            </label>
                            <input
                                type="number"
                                id="weight"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                                placeholder="הזן משקל"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    setShowWeightModal(false);
                                    setNewWeight('');
                                }}
                            >
                                ביטול
                            </button>
                            <button
                                className="bg-[#1f18de] hover:bg-[#1f18deeb] text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddWeight}
                            >
                                שמירה
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;