import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const WeightChart = ({ data, options }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800" dir="rtl">מעקב משקל</h2>

            <div
                style={{
                    overflowX: "auto",
                    width: "100%",
                }}
            >
                <div style={{ minWidth: `${data.labels.length * 40}px`, height: "300px" }}>
                    <Line ref={chartRef} options={options} data={data} />
                </div>
            </div>
        </div>
    );
};

export default WeightChart;