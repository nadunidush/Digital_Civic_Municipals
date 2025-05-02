import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchComplaintCounts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/complaint-count-by-department");
                const data = response.data;

                const labels = data.map((item) => item.departmentName); // Extract department names
                const counts = data.map((item) => item.complaintCount); // Extract complaint counts

                setChartData({
                    labels,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "#4caf50",
                                "#f44336",
                                "#ffeb3b",
                                "#2196f3",
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching complaint counts:", error);
            }
        };

        fetchComplaintCounts();
    }, []);

    if (!chartData) return <div>Loading chart...</div>;

    return (
        <Pie
            data={chartData}
            options={{
                aspectRatio: 3,
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                const percentage = ((value / total) * 100).toFixed(2) + "%";
                                return `${context.label}: ${value} (${percentage})`;
                            },
                        },
                    },
                },
            }}
        />
    );
}

export default PieChart;
