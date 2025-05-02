import NavBar from "../admin_components/nav_bar"
import ComparisonTile from "../admin_components/comparison_tile"
import React, { useEffect, useState } from "react";
import axios from "axios";


function ComparisonPage(){

    // get complaint details 
    const [departments, setDepartments] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:8080/departments-with-complaints"); // Ensure the endpoint matches your Express route
                const data = response.data;
                setDepartments(data); // Save department data
                setLoading(false);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError("Failed to load data");
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <>
             <div className="flex flex-row">
                <NavBar/>
                <div className="w-0.5 bg-gray-500 h-vh ml-12 mr-5"></div>
                <div>
                    <h1 className="font-bold text-2xl mt-5">All Complaints</h1>
                    <div className="flex pt-5">
                        <img className="w-6" src="src/assets/images/all_components.png" alt="All" />
                        <p className="pl-3 font-light">All</p>
                    </div>
                    <div className="flex flex-wrap space-around">
                        {departments.map((department) => (
                            <ComparisonTile
                                key={department._id}
                                image={department.complaintImages[0]?.url || "https://lirp.cdn-website.com/818538c1/dms3rep/multi/opt/overfull+trash+cans-640w.jpeg"}
                                title={department.complaintId.title}
                                description={department.complaintId.description}
                                department={department.departmentName}
                                complaintStatus={department.complaintStatus}
                                status={department.complaintId.status}
                                Navigator={`/completioncomplaint/${department._id}`}
                                complaintId={department.complaintId._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComparisonPage