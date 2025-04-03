import React from 'react';

const WeightStatistics = ({ currentWeight, weightChange, onAddWeightClick }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800" dir="rtl">תהליך משקל</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">משקל נוכחי</p>
                    <p className="text-2xl font-bold text-[#1f18de]">{currentWeight} kg</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">סה״כ שינויים</p>
                    <p className={`text-2xl font-bold ${weightChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
                    </p>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="bg-[#1f18de] hover:bg-[#1f18deeb] text-white font-bold py-2 px-4 rounded"
                    onClick={onAddWeightClick}
                >
                    הוספת משקל
                </button>
            </div>
        </div>
    );
};

export default WeightStatistics;