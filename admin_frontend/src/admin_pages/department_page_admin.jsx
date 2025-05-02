import ComplaintCountCom from "../admin_components/complaint_count_com"
import NavBar from "../admin_components/nav_bar"
import DepComplaintTile from "../admin_components/dep_complaint_tile"
import React, { useEffect, useState } from "react";
import axios from "axios";

function DepartmentPageAdmin() {
    /* DropDown Selection of Department */
        const [isOpen, setIsOpen] = useState(false);
        const [selectedDepartment, setSelectedDepartment] = useState("All Department");
        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };
        const handleDepartmentSelect = (department) => {
            setSelectedDepartment(department);
            setIsOpen(false);
        };
        const category = ["Road Department", "Waste Department", "Ayurweder Department", "Lighting Of Street", "Property", "Cremetorium"];

        // get complaint details 
        const [departments, setDepartments] = useState([]); 
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        const [totalComplaints, setTotalComplaints] = useState(0);
        const [completedComplaints, setCompletedComplaints] = useState(0);
        const [cancelledComplaints, setCancelledComplaints] = useState(0);
        const [availableComplaints, setAvailableComplaints] = useState(0);

        useEffect(() => {
            const fetchDepartments = async () => {
                try {
                    const response = await axios.get("http://localhost:8080/departments-with-complaints"); // Ensure the endpoint matches your Express route
                    const data = response.data;
                    setDepartments(data); // Save department data
    
                    // Calculate total complaints
                    const allComplaints = data.filter(department => department.complaintId); // Only count departments with complaints
                    setTotalComplaints(allComplaints.length);
    
                    // Calculate completed complaints
                    const completed = allComplaints.filter(department => department.complaintStatus === "Completed");
                    setCompletedComplaints(completed.length);

                    // Calculate canclled complaints
                    const cancelled = allComplaints.filter(department => department.complaintStatus === "Cancelled");
                    setCancelledComplaints(cancelled.length);

                    // Calculate available complaints
                    const available = allComplaints.filter(department => department.complaintStatus === "Inprogress" || department.complaintStatus === "Pending");
                    setAvailableComplaints(available.length);
    
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
            <div className="flex flx-row">
                {/* NavBar*/}
                <NavBar/>

                {/* Middle Line*/}
                <div className="w-0.5 bg-gray-500 h-vh ml-5"></div>

                {/* Department Complaints*/}
                <div className="ml-5">
                    <h1 className="font-bold text-2xl mt-5 mb-5">All Department Complaints</h1>
                    <div className="flex flex-row justify-between">
                        <div>
                            <ComplaintCountCom complaintName="Total Complaints" complaintCount={totalComplaints}/>
                        </div>   
                        <div className="ml-5">
                            <ComplaintCountCom complaintName="Completed Complaints" complaintCount={completedComplaints}/>
                        </div>   
                        <div className="ml-5">
                            <ComplaintCountCom complaintName="Canceled Complaints" complaintCount={cancelledComplaints}/>
                        </div>   
                        <div className="ml-5">
                            <ComplaintCountCom complaintName="Available Complaints" complaintCount={availableComplaints}/>
                        </div>   
                    </div>

                    {/* According to the departments complaints*/}
                    <div className="flex flex-row mt-10 mb-5">
                        <div>
                            <button
                                onClick={toggleDropdown}
                                className="inline-flex justify-center w-full rounded-md 
                                    border border-gray-300 shadow-sm px-4 py-2 bg-white 
                                    text-sm font-medium text-gray-700 hover:bg-gray-50 
                                    focus:outline-none"
                            >
                                {selectedDepartment}
                                {isOpen ? (
                                    <img
                                        className="w-6 ml-3 transition delay-150 duration-300 ease-in-out"
                                        src="https://icons.veryicon.com/png/o/internet--web/industrial-icon/up-arrow.png"
                                        alt="Up Arrow"
                                    />
                                ) : (
                                    <img
                                        className="w-6 ml-3"
                                        src="https://icons.veryicon.com/png/o/miscellaneous/unionpay-digital-marketing/down-arrow-thin.png"
                                        alt="Down Arrow"
                                    />
                                )}
                            </button>

                            {isOpen && (
                                <div className="border absolute border-gray-300 mt-2 rounded-md bg-white shadow-md">
                                    {category.map((department) => (
                                        <div
                                            key={department}
                                            onClick={() => handleDepartmentSelect(department)}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {department}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-15">
                        {departments.map((department) => (
                            <DepComplaintTile
                                key={department._id}
                                title={department.complaintId?.title || "No Title"}
                                image={department.complaintId?.files[0]?.url || "https://lirp.cdn-website.com/818538c1/dms3rep/multi/opt/overfull+trash+cans-640w.jpeg"}
                                priority={department.complaintId?.pLevel || "Unknown"}
                                status={department.complaintId?.status || "Unknown"}
                                complaintStatus = {department.complaintStatus || "Unknown"}
                            />
                        ))}
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default DepartmentPageAdmin