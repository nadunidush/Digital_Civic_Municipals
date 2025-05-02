import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { motion } from "framer-motion"; // For smooth animations
import DepNavBar from "../department_components/dep_nav_bar";
import { useLocation } from "react-router-dom";

const customStyles = {
    headRow: { style: { backgroundColor: "#1E40AF", color: "white", fontWeight: "bold", textTransform: "uppercase" } },
    headCells: { style: { fontSize: "16px" } },
    cells: { style: { fontSize: "14px", padding: "12px" } },
    rows: { style: { backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" } }
};

function DepartmentProfile() {
    const location = useLocation();
    const { departmentName} = location.state || {};
    const [records, setRecords] = useState([]);
    const [workerDetails, setWorkerDetails] = useState({ name: "", address: "", email: "", phone: "", department: "" });

    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/workers?departmentName=${departmentName}`);
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching workers:", error);
        }
    };
    
    

    const handleInputChange = (e) => {
        setWorkerDetails({ ...workerDetails, [e.target.name]: e.target.value });
    };

    const addWorker = async () => {
        try {
            if (!workerDetails.name || !workerDetails.address || !workerDetails.email || !workerDetails.phone) {
                alert("All fields are required!");
                return;
            }
    
            await axios.post("http://localhost:8080/workers", { ...workerDetails, department: departmentName }, { headers: { "Content-Type": "application/json" } });
            setWorkerDetails({ name: "", address: "", email: "", phone: "", department: departmentName });
            fetchWorkers();
        } catch (error) {
            console.error("Error adding worker:", error.response ? error.response.data : error);
        }
    };
    

    const deleteWorker = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/workers/${id}`);
            fetchWorkers();
        } catch (error) {
            console.error("Error deleting worker:", error);
        }
    };

    const columns = [
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Address", selector: (row) => row.address, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Phone", selector: (row) => row.phone, sortable: true },
        { name: "Department", selector: (row) => row.department, sortable: true },
        { name: "Actions", 
            cell: (row) => (
                <div className="flex gap-x-3"> 
                    <motion.button className="bg-red-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
                        whileHover={{ scale: 1.1 }} onClick={() => deleteWorker(row._id)}>Delete</motion.button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-screen min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex flex-row justify-start p-5">
            <DepNavBar />

            <div className="w-0.5 bg-gray-500 h-auto mx-5"></div>

            <div className="flex flex-col w-450">
                <h1 className="text-3xl font-extrabold text-blue-900 mb-5">Workers Profiles</h1>

                <motion.div className="bg-white shadow-lg rounded-lg p-5 flex gap-x-3"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    
                    {["name", "address", "email", "phone", "department"].map((field) => (
                        <input key={field} type="text" name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            onChange={handleInputChange} className="w-40 p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300"/>
                    ))}
                    
                    <motion.button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
                        whileHover={{ scale: 1.1 }} onClick={addWorker}>Add Worker</motion.button>
                </motion.div>

                <div className="mt-5 bg-white shadow-lg rounded-lg p-5">
                    <DataTable columns={columns} data={records} fixedHeader pagination selectableRows customStyles={customStyles} responsive />
                </div>
            </div>
        </div>
    );
}

export default DepartmentProfile;
