import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ComplaintDetailsPage() {
    const navigate = useNavigate();
    

    /* DropDown Selection of Department */
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState("Select Department");
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
        setIsOpen(false);
    };
    const departments = ["Road Department", "Waste Department", "Ayurweder Department", "Lighting Of Street", "Property", "Cremetorium"];

    // get complaintId
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);

    useEffect(() => {

        const fetchComplaint = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/complaints/${id}`);
                setComplaint(response.data);
            } catch (error) {
                console.error('Error fetching complaint:', error);
            }
        };

        fetchComplaint();
    }, [id]);


    // submit complaint according to the department

    const handleSubmit = async () => {
        if (!selectedDepartment || selectedDepartment === "Select Department") {
            alert("Please select a department!");
            return;
        }

        try {
            await axios.post('http://localhost:8080/departments', {
                departmentName: selectedDepartment,
                complaintId: id
            });
            alert("Complaint linked to department successfully!");
            const pTag = document.querySelector('p.new');
            if (pTag) {
                pTag.remove();
            }

            // Redirect to AllComplaint page
            navigate('/allcomplaintadmin');
        } catch (error) {
            console.error("Error linking to department:", error);
            alert("Failed to link complaint to department.");
        }
    };

   

    // select the image
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    useEffect(() => {
        if (complaint && complaint.files?.length > 0) {
            setSelectedImageUrl(complaint.files[0].url);
        }
    }, [complaint]);

    if (!complaint) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="px-10 py-10">
                <h1 className="font-bold text-2xl text-red-700 mb-5 flex flex-row justify-center items-center">{complaint.title}</h1>
                <div className="flex flex-row gap-x-10 justify-center items center">
                    {complaint.files?.length > 0 && (
                        <img
                            src={selectedImageUrl || complaint.files[0].url}
                            alt="Complaint Preview"
                            className="h-[400px] w-[400px] rounded-lg object-cover shadow-lg"
                        />
                    )}
                    <div className="flex flex-col gap-y-5">
                        {complaint.files?.map((file, index) => (
                            <img
                                key={index}
                                src={file.url}
                                alt={`Complaint Preview ${index + 1}`}
                                className={`w-[100px] h-[100px] rounded-lg cursor-pointer border-2 ${
                                    selectedImageUrl === file.url ? "border-blue-500" : "border-gray-300"
                                }`}
                                onClick={() => setSelectedImageUrl(file.url)}
                            />
                        ))}
                    </div>
                </div>

                {/* Complaint Description */}
                <h1 className="font-bold text-2xl mt-5">Complaint Description</h1>
                <p className="mt-2">
                    {complaint.description}
                </p>

                {/* User's Details */}
                <div className="mt-8 flex flex-row gap-x-40">
                    <div>
                        <div className="flex flex-row gap-x-8">
                            <p className="font-bold">User Name:</p>
                            <p>{complaint.userId ? complaint.userId.userName : 'Loading...'}</p>
                        </div>
                        <div className="flex flex-row gap-x-8 mt-3">
                            <p className="font-bold">User Address:</p>
                            <p>{complaint.userId?.address || 'Loading...'}</p>
                        </div>
                        <div className="flex flex-row gap-x-8 mt-3">
                            <p className="font-bold">Priority Level:</p>
                            <p>{complaint.pLevel}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-x-8">
                            <p className="font-bold">User Email:</p>
                            <p>{complaint.userId?.email || 'Loading...'}</p>
                        </div>
                        <div className="flex flex-row gap-x-8 mt-3">
                            <p className="font-bold">User Phone num:</p>
                            <p>{complaint.userId?.phoneNumber || 'Loading...'}</p>
                        </div>
                    </div>
                </div>

                {/* Department Selection */}
                <div>
                    <h1 className="font-bold text-2xl mt-10 mb-5">Department Selection</h1>
                    <div className='flex flex-row gap-x-15'>
                        <p>Department</p>
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
                                    {departments.map((department) => (
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
                </div>

                {/* Submit Button */}
                <button onClick={handleSubmit} className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-5 rounded cursor-pointer'}>Submit</button>

                {/* Complaint Location */}
                <h1 className="font-bold text-2xl mt-10 mb-5">Complaint Location</h1>
                <a
                    href={complaint?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#fff",
                        background: "linear-gradient(45deg, #FF6F91, #FF9671)",
                        border: "none",
                        borderRadius: "10px",
                        textDecoration: "none",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.1)";
                        e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                    }}
                    >
                    🚀 View Complaint Location 🌟
                </a>

            </div>
        </>
    );
}

export default ComplaintDetailsPage;
