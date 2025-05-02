import NavBar from "../admin_components/nav_bar"
import ComplaintTile from "../admin_components/complaint_tile"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllComplaintAdmin() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/complaints')
          .then((response) => setComplaints(response.data))
          .catch((error) => console.error('Error:', error));
      }, [complaints]);
    return (
        <>
            <div className="flex flex-row ml-4">
                <NavBar/>
                <div className="w-0.5 bg-gray-500 h-vh ml-10 mr-5"></div>
                <div>
                    <h1 className="font-bold text-2xl mt-5">All Complaints</h1>
                    <div className="flex flex-row pt-5">
                        <img className="w-6" src="src/assets/images/all_components.png" alt="All" />
                        <p className="pl-3 font-light">All</p>
                    </div>
                    <div className="flex flex-wrap space-around">
                    {complaints.map((item, index) => (
                        <ComplaintTile
                            key={index}
                            Navigator="/complaintdetails"
                            complaintName={item.title}
                            complaintDesc={item.description}
                            files={item.files}
                            complaintId={item._id}
                            status = {item.status}
                        />
                    ))}
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllComplaintAdmin