import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SendReportDepartment() {
    const navigate = useNavigate();
    const { id } = useParams(); // Retrieve the _id from the URL
    const [leader, setLeader] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/departments-with-complaints`);
                const departmentData = response.data.find((dep) => dep._id === id);
                setLeader(departmentData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching department:", err);
                setError("Failed to load department data");
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);

    useEffect(() => {
        if (leader && leader.complaintImages?.length > 0) {
            setSelectedImageUrl(leader.complaintImages[0].url);
        }
    }, [leader]);


    if (loading) return <div className="flex justify-center items-center h-screen text-xl font-bold">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-500 font-bold">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 px-10 py-10">
            <h1 className="text-4xl font-extrabold text-center text-purple-700">{leader.complaintStatus || "Loading..."} Complaint</h1>

            {/* Complaint Title */}
            <h2 className="text-3xl font-bold text-green-700 text-center my-8">{leader.complaintId.title}</h2>

            {/* Complaint Images Section */}
            <div className="flex flex-col items-center space-y-6">
                {leader.complaintImages?.length > 0 ? (
                    <img
                        src={selectedImageUrl || leader.complaintImages[0]?.url}
                        alt="Complaint Preview"
                        className="w-[400px] h-[400px] rounded-lg shadow-lg object-cover transition-transform transform hover:scale-105"
                    />
                ) : (
                    <p className="text-gray-500 text-lg">No images available</p>
                )}
                <div className="flex gap-4 overflow-x-auto">
                    {leader.complaintImages?.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-[80px] h-[80px] rounded-lg cursor-pointer border-2 ${
                                selectedImageUrl === file.url ? "border-purple-500" : "border-gray-300"
                            } hover:border-purple-700 shadow-md`}
                            onClick={() => setSelectedImageUrl(file.url)}
                        />
                    ))}
                </div>
            </div>

            {/* Complaint Description */}
            <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-gray-700">Complaint Description</h3>
                <p className="mt-3 text-gray-600">{leader.complaintId.description}</p>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-2 gap-6 mt-10 bg-white shadow-lg rounded-xl p-6">
                <div>
                    <p className="text-gray-700">
                        <strong>User Name:</strong> {leader.complaintId?.userId?.name || "Loading..."}
                    </p>
                    <p className="text-gray-700 mt-2">
                        <strong>Address:</strong> {leader.complaintId?.userId?.address || "Loading..."}
                    </p>
                    <p className="text-gray-700 mt-2">
                        <strong>Priority Level:</strong> {leader.complaintId?.pLevel || "Loading..."}
                    </p>
                </div>
                <div>
                    <p className="text-gray-700">
                        <strong>Email:</strong> {leader.complaintId?.userId?.email || "Loading..."}
                    </p>
                    <p className="text-gray-700 mt-2">
                        <strong>Phone Number:</strong> {leader.complaintId?.userId?.phoneNumber || "Loading..."}
                    </p>
                </div>
            </div>

            {/* Complaint Status & Department */}
            <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
                <p className="text-gray-700">
                    <strong>Department:</strong> {leader.departmentName || "Loading..."}
                </p>
                <p className="text-gray-700 mt-2">
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600 font-bold">{leader.complaintStatus || "Loading..."}</span>
                </p>
            </div>


            {/* Complaint Location */}
            <div className="mt-12 text-center">
                <a
                    href={leader.complaintId.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform"
                >
                    🌍 View Complaint Location 🚀
                </a>
            </div>
        </div>
    );
}

export default SendReportDepartment;
