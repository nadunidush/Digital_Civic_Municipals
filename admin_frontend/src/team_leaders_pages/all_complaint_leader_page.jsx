import ComplaintTile from "../admin_components/complaint_tile";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LeaderNavBar from "../team_leaders_components/leader_navbar";

function AllComplaintLeader() {
    const [departmentsName, setDepartmentsName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const { departmentName , endDate} = location.state || {};

    // Dropdown Selection of Department
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Select Department");
    const categories = ["Disposal Garbage", "Transport Garbage"];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchComplaints = async () => {
            if (!departmentName) {
                setErrorMessage("Department name is missing.");
                return;
            }

            setIsLoading(true);
            try {
                const token = localStorage.getItem("token");
                const firstWord = departmentName.split(" ")[0]; // Extract the first word of departmentName

                const response = await fetch(
                    `http://localhost:8080/complaints/teamleader/${firstWord}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setComplaints(data); // Set the array of complaints directly
                setDepartmentsName(departmentName);
                setErrorMessage("");
            } catch (error) {
                console.error("Error fetching complaints:", error);
                setErrorMessage("Failed to load complaints. Please try again.");
                setComplaints([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComplaints();
    }, [departmentName]);

    const colors = ["#44BFFD", "#FFD700", "#4CAF50", "#FF5733"];

    return (
        <div className="flex flex-row ml-4">
            <LeaderNavBar />
            <div className="w-0.5 bg-gray-500 h-vh ml-10 mr-5"></div>
            <div>
            <h1 className="text-2xl font-bold text-blue-600">
                {isLoading
                    ? "Loading department..."
                    : departmentsName
                    ? `${departmentsName.split(" ")[0]} Team Leader`
                    : "No department found"}
            </h1>
                            {errorMessage && (
                    <p className="text-red-500 font-semibold">{errorMessage}</p>
                )}
                <div className="flex flex-row pt-5 items-center">
                    <img
                        className="w-6 h-6"
                        src="src/assets/images/all_components.png"
                        alt="All"
                    />
                    <p className="font-semibold text-lg ml-4">All</p>
                </div>
                {isLoading ? (
                    <p>Loading complaints...</p>
                ) : complaints.length > 0 ? (
                    <div className="flex flex-wrap gap-5 pt-5">
                        {complaints.map((complaint, index) => (
                            <ComplaintTile
                                key={complaint._id}
                                Bgcolor={colors[index % colors.length]}
                                color="black"
                                Navigator="/complaintdetailsleader"
                                complaintName={complaint.title}
                                complaintDesc={complaint.description}
                                files={complaint.files}
                                complaintId={complaint._id}
                                complaint={complaint}
                                departmentName={departmentName}
                                endDate={endDate}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No complaints available for this department.</p>
                )}
            </div>
        </div>
    );
}

export default AllComplaintLeader;
