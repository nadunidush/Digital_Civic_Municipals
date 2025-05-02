import React, { useEffect, useState } from "react";
import ComparisonTileLeader from "../team_leaders_components/comparison_tile_leader";
import LeaderNavBar from "../team_leaders_components/leader_navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

function AllReportsLeader() {
    const location = useLocation();
    const { departmentName } = location.state || {}; // Get logged-in department
    
    const [leaders, setLeaders] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                if (!departmentName) {
                    throw new Error("No department name provided");
                }

                const firstWord = departmentName.split(" ")[0]; // Get first word

                const response = await axios.get(`http://localhost:8080/leaders-with-complaints?departmentName=${firstWord}`);
                setLeaders(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError("Failed to load data");
                setLoading(false);
            }
        };

        fetchDepartments();
    }, [departmentName]); // Ensure updates when departmentName changes

    if (loading) return <div className="text-xl text-gray-700 mt-5">Loading complaints...</div>;
    if (error) return <div className="text-red-600 text-lg">{error}</div>;

    return (
        <>
            <div className="flex flex-row">
                <LeaderNavBar />
                <div className="w-0.5 bg-gray-500 h-screen ml-12 mr-5"></div>
                <div>
                    {/* <h1 className="font-bold text-2xl mt-5">Complaints for {departmentName}</h1> */}
                    <div className="flex pt-5">
                        <img className="w-6" src="src/assets/images/all_components.png" alt="All Complaints" />
                        <p className="pl-3 font-bold text-2xl">All Complaints</p>
                    </div>
                    <div className="flex flex-wrap space-around">
                        {leaders.length > 0 ? (
                            leaders.map((leader) => (
                                <ComparisonTileLeader
                                    key={leader._id}
                                    image={leader.complaintImages[0]?.url || "https://lirp.cdn-website.com/818538c1/dms3rep/multi/opt/overfull+trash+cans-640w.jpeg"}
                                    title={leader.complaintId?.title || "No title available"}
                                    description={leader.complaintId?.description || "No description available"}
                                    department={leader.departmentName || "Unknown Department"}
                                    complaintStatus={leader.complaintStatus || "Status Unavailable"}
                                    status={leader.complaintId?.status || "No Status"}
                                    Navigator={`/sendreportdepartment/${leader._id}`}
                                    complaintId={leader.complaintId?._id}
                                />
                            ))
                        ) : (
                            <p className="text-gray-600 text-lg mt-5">No complaints found for {departmentName}.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllReportsLeader;
