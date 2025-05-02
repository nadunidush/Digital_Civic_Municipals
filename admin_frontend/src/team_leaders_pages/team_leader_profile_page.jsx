import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"; // For smooth animations
import DataTable from "react-data-table-component"
import LeaderNavBar from "../team_leaders_components/leader_navbar"
import { useLocation } from "react-router-dom";

const customStyles = {
    headRow: { style: { backgroundColor: "#9333EA", color: "white", fontWeight: "bold", textTransform: "uppercase" } },
    headCells: { style: { fontSize: "16px", color: "#E9D5FF" } },
    cells: { style: { fontSize: "14px", padding: "12px", color: "#4C1D95" } },
    rows: { style: { backgroundColor: "#FAF5FF", borderBottom: "1px solid #C4B5FD" } }
};



function TeamLeaderProfile(){
    const location = useLocation();
    const { departmentName} = location.state || {};
    const [record, setRecord] = useState([]);

    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/workers?departmentName=${departmentName}`);
            setRecord(response.data);
        } catch (error) {
            console.error("Error fetching workers:", error);
        }
    };
    const column = [
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Address", selector: (row) => row.address, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Phone", selector: (row) => row.phone, sortable: true },
        { name: "Department", selector: (row) => row.department, sortable: true },
    ]

    // useEffect(() => {
    //     const fetData = async () =>{
    //         axios.get('https://jsonplaceholder.typicode.com/users')
    //         .then(res => {
    //             setRecord(res.data) 
    //             setFilterRecord(res.data)})
    //         .catch(err => console.log(err));
    //     }
    //     fetData();
    // }, [])

    // const [records, setRecords] = useState([])
    // const [filterRecords, setFilterRecord] = useState([])
    // const handleFilter = (event) =>{
    //     const newData = filterRecords.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()));
    //     setRecord(newData);
    // }
    return(
        <>
            <div className="w-screen min-h-screen flex flex-row justify-start m-0">
                <LeaderNavBar/>
                <div className="w-0.5 bg-gray-500 h-vh ml-5 mr-5"></div>

                <div className="flex flex-col">
                    {/* Team Leader and Team members Profiles*/}
                    <div>
                        <h1 className="font-bold text-2xl mt-5 text-orange-700">Workers Profile Details</h1>
                        <div className="mt-5 bg-white shadow-lg rounded-lg p-5 w-240">
                            <DataTable columns={column} data={record} fixedHeader pagination selectableRows customStyles={customStyles} responsive />
                         </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamLeaderProfile