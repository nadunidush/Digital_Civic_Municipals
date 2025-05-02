import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(Tooltip, Legend);

function BarChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchComplaintStatistics = async () => {
            try {
                const response = await axios.get("http://localhost:8080/department-complaint-statistics");
                const data = response.data;

                const labels = Object.keys(data); // Extract department names
                const pendingCounts = labels.map((dept) => data[dept].Pending); // Extract Pending counts
                const inprogressCounts = labels.map((dept) => data[dept].Inprogress); // Extract Inprogress counts
                const completedCounts = labels.map((dept) => data[dept].Completed); // Extract Completed counts

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Pending",
                            data: pendingCounts,
                            backgroundColor: "orange",
                        },
                        {
                            label: "Inprogress",
                            data: inprogressCounts,
                            backgroundColor: "purple",
                        },
                        {
                            label: "Completed",
                            data: completedCounts,
                            backgroundColor: "green",
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching complaint statistics:", error);
            }
        };

        fetchComplaintStatistics();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                
            },
        },
    };

    if (!chartData) return <div>Loading chart...</div>;

    return <Bar options={options} data={chartData} />;
}

export default BarChart;
