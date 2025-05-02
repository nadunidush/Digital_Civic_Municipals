import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function WorkProgressTable({ departmentName }) {
    const [workProgress, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchComplaints = async () => {
            if (!departmentName) {
                setErrorMessage("Department name is missing.");
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/complaint/teamleader/${departmentName}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setComplaints(data);
                setErrorMessage("");
            } catch (error) {
                console.error("Error fetching complaints:", error);
                setErrorMessage(`Failed to fetch complaints: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComplaints();
    }, [departmentName]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">
            <p className="text-lg font-semibold text-blue-600 animate-pulse">Loading...</p>
        </div>;
    }

    if (errorMessage) {
        return <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-500 font-semibold">{errorMessage}</p>
        </div>;
    }

    return (
        <div className="pt-4">
            <div className="relative overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase text-sm">
                        <tr>
                            <th scope="col" className="px-6 py-4">Complaint ID</th>
                            <th scope="col" className="px-6 py-4">Complaint Title</th>
                            <th scope="col" className="px-6 py-4 text-center">Details</th>
                            <th scope="col" className="px-6 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workProgress.length > 0 ? (
                            workProgress.map((work, index) => (
                                <tr
                                    key={index}
                                    className="bg-white hover:bg-blue-50 border-b transition duration-200"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {work.complaintId || "Unknown ID"}
                                    </td>
                                    <td className="px-6 py-4">{work.complaintTitle || "Unknown Title"}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            to={`/sendtocitizen/${work.complaintId}`}
                                            state={{
                                                complaintId: work.complaintId,
                                                complaintTitle: work.complaintTitle,
                                                complaintDescription: work.complaintDescription,
                                                complaintPlevel: work.complaintPlevel,
                                                complaintUrl: work.complaintUrl,
                                                complaintImages: work.complaintImages,
                                                complaintStatus: work.complaintStatus,
                                                complaintDepartment: work.complaintDepartment,
                                                user: {
                                                    userName: work.user?.userName || "Unknown Name",
                                                    userEmail: work.user?.userEmail || "Unknown Email",
                                                    userPhone: work.user?.userPhone || "Unknown Phone",
                                                    userAddress: work.user?.userAddress || "Unknown Address",
                                                },
                                            }}
                                        >
                                            <button className="text-blue-600 font-semibold hover:underline cursor-pointer">
                                                See More
                                            </button>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                                                work.complaintStatus === "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : work.complaintStatus === "Inprogress"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {work.complaintStatus || "Unknown"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                    No work progress available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WorkProgressTable;
