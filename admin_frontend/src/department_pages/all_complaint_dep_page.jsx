import ComplaintTile from "../admin_components/complaint_tile";
import React, { useState, useEffect } from "react";
import DepNavBar from "../department_components/dep_nav_bar";
import { useLocation } from "react-router-dom";

function AllComplaintDep() {
  const [departmentsName, setDepartmentsName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { departmentName, departmentId } = location.state || {};

  /* Dropdown Selection of Department */
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
        const response = await fetch(
          `http://localhost:8080/complaints/department/${departmentName}`,
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
        setComplaints(data); // Directly set the array of complaints
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

  const colors = ["#44BFFD", "#FFD700", "#4CAF50", "#FF5733", "#9370DB"];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex">
      {/* Navigation Bar */}
      <DepNavBar />
      <div className="w-0.5 bg-gray-400 h-auto mx-10"></div>
      
      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-700">
            {isLoading
              ? "Loading department..."
              : departmentsName
              ? departmentsName
              : "No department found"}
          </h1>
          {errorMessage && (
            <p className="text-red-500 font-semibold mt-2">{errorMessage}</p>
          )}
        </div>

        {/* Section Icon */}
        <div className="flex items-center mb-6">
          <img
            className="w-10 h-10 rounded-full shadow-md"
            src="src/assets/images/all_components.png"
            alt="All Components"
          />
          <p className="text-lg font-semibold text-gray-800 ml-4">All Complaints</p>
        </div>

        {/* Complaints Section */}
        {isLoading ? (
          <p className="text-lg text-gray-600 animate-pulse">Loading complaints...</p>
        ) : complaints.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-74 gap-y-10">
            {complaints
              .filter((complaint) => complaint && complaint.title) // Filter out invalid complaints
              .map((complaint, index) => (
                <ComplaintTile
                  key={complaint._id}
                  Bgcolor={colors[index % colors.length]}
                  color="black"
                  Navigator="/complaintdetailsdev"
                  complaintName={complaint.title}
                  complaintDesc={complaint.description}
                  files={complaint.files}
                  complaintId={complaint._id}
                  complaint={complaint}
                  departmentName={departmentName}
                />
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No complaints available for this department.
          </p>
        )}
      </div>
    </div>
  );
}

export default AllComplaintDep;
