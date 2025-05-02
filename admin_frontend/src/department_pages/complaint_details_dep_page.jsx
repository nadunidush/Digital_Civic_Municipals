import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ComplaintDetailsDevPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams(); 
    const { complaint, departmentName } = location.state || {};
    const complaintId = complaint?._id;

    // Date Picker
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleChange = (range) => {
        const [start, end] = range;
        setStartDate(start);
        setEndDate(end);
    };

    // Calculate selected days
    const calculateDaysDifference = (start, end) => {
        if (start && end) {
            const diffTime = Math.abs(end - start);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        return 0;
    };

    // Select the image
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    useEffect(() => {
        if (complaint?.files?.length > 0) {
            setSelectedImageUrl(complaint.files[0].url);
        }
    }, [complaint]);

    // Submit work to work leaders
    const handleSubmit = async () => {
        if (!startDate || !endDate || !departmentName || !complaintId) {
            alert("Please select a valid date range and ensure the ComplaintId is present.");
            return;
        }

        const duration = calculateDaysDifference(startDate, endDate);

        const newWorkLeaderWork = {
            startDate,
            endDate,
            duration,
            departmentName,
            complaintId,
        };

        try {
            const response = await axios.post("http://localhost:8080/workleadersworks", newWorkLeaderWork);

            if (response.status === 200) {
                alert("WorkLeaderWork created successfully!");
                navigate('/allcomplaintdep');
            } else {
                alert("Failed to create WorkLeaderWork. Please try again.");
            }
        } catch (error) {
            console.error("Error creating WorkLeaderWork:", error);
            alert("An error occurred while creating WorkLeaderWork.");
        }
    };

    if (!complaint) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
                <p className="text-lg font-bold text-gray-500">Complaint details not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-10 py-10">
            {/* Complaint Title */}
            <h1 className="text-3xl font-bold text-center text-red-600">{complaint.title}</h1>

            {/* Images Section */}
            <div className="flex flex-wrap gap-x-10 justify-center items-center mt-8">
                <div>
                    {complaint.files?.length > 0 ? (
                        <img
                            src={selectedImageUrl || complaint.files[0]?.url}
                            alt="Complaint Preview"
                            className="w-[400px] h-[400px] rounded-lg shadow-lg object-cover"
                        />
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="flex flex-row gap-x-4 overflow-x-auto">
                    {complaint.files?.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt={`Complaint Preview ${index + 1}`}
                            className={`w-[100px] h-[100px] rounded-lg cursor-pointer border-2 ${
                                selectedImageUrl === file.url ? "border-blue-500" : "border-gray-300"
                            } shadow-sm`}
                            onClick={() => setSelectedImageUrl(file.url)}
                        />
                    ))}
                </div>
            </div>

            {/* Complaint Description */}
            <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800">Description:</h2>
                <p className="mt-2 text-gray-600">{complaint.description}</p>
            </div>

            {/* User Details */}
            <div className="mt-8 grid grid-cols-2 gap-x-10 bg-white rounded-lg shadow-lg p-6">
                <div>
                    <p className="text-gray-700"><strong>User Name:</strong> {complaint.userId?.userName || "Loading..."}</p>
                    <p className="text-gray-700 mt-2"><strong>Address:</strong> {complaint.userId?.address || "Loading..."}</p>
                    <p className="text-gray-700 mt-2"><strong>Priority Level:</strong> {complaint.pLevel}</p>
                </div>
                <div>
                    <p className="text-gray-700"><strong>Email:</strong> {complaint.userId?.email || "Loading..."}</p>
                    <p className="text-gray-700 mt-2"><strong>Phone:</strong> {complaint.userId?.phoneNumber || "Loading..."}</p>
                </div>
            </div>

            {/* Work Selection */}
            <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800">Work Selection:</h2>
                <div className="flex items-center gap-x-10 mt-5">
                    <p className="text-gray-700">Deadline:</p>
                    <DatePicker
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                        placeholderText="Select Deadline"
                        selected={startDate}
                        onChange={handleChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                    />
                    {startDate && endDate ? (
                        <p className="text-gray-700">
                            Number of days selected: {calculateDaysDifference(startDate, endDate)}
                        </p>
                    ) : (
                        <p className="text-gray-600">Please select a date range</p>
                    )}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5 transition"
                >
                    Submit
                </button>
            </div>

            {/* Cancel Work */}
            <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800">Cancel Work:</h2>
                <textarea
                    className="border border-gray-300 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-red-400"
                    rows="5"
                    placeholder="Enter reason to cancel"
                ></textarea>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 transition"
                >
                    Submit
                </button>
            </div>

            {/* Complaint Location */}
            <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800">Complaint Location:</h2>
                <a
                    href={complaint.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold py-3 px-6 rounded-lg mt-5 shadow-lg hover:scale-105 transform transition duration-300 hover:shadow-xl"
                >
                    🚀 View Complaint Location 🌟
                </a>
            </div>
        </div>
    );
}

export default ComplaintDetailsDevPage;
