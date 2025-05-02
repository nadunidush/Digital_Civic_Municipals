import React, { useState,useEffect } from 'react';
import { Navigate, useLocation, useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ComplaintDetailsLeader(){
    const navigate = useNavigate()
        
    const location = useLocation();
    const { id } = useParams(); // Access complaint ID from URL
    const { complaint, departmentName , endDate} = location.state || {};
    const complaintId = complaint._id
   
    // select the image
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    useEffect(() => {
        if (complaint && complaint.files?.length > 0) {
            setSelectedImageUrl(complaint.files[0].url);
        }
    }, [complaint]);
    if (!complaint) {
        return <p>Complaint details not found.</p>;
    }

    // Add to workers
    const [data,setData] = useState([{Worker:""}])

    const handleClick=()=>{
        setData([...data,{Worker:""}])
    }
    const handleChange=(e,i)=>{
        const onChangeVal = [...data];
        onChangeVal[i].Worker = e.target.value;
        setData(onChangeVal);
    }

    const handleDelete=(i)=>{
        const deleteValue = [...data]
        deleteValue.splice(i,1)
        setData(deleteValue)
    }

    //send complaint via email to workers
    const handleSubmit = async () => {
        const emailData = {
            email: data.map(worker => worker.Worker), // Workers' email addresses
            complaintDetails: {
                title: complaint.title,
                description: complaint.description,
                endDate: endDate
            },
            imageUrls: complaint.files.map(file => file.url), // Extract image URLs from complaint
            locationUrl: complaint.url
        };
    
        try {
            await axios.post('http://localhost:8080/send-email', emailData);
            alert('Emails sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    };
    
    return (
        <>
            <div className="px-10 py-10">
                <h1 className="font-bold text-2xl text-red-700 mb-5 flex flex-row justify-center items-center">{complaint.title}</h1>
                <div className="flex flex-row gap-x-10 justify-center items center">
                    {complaint.files?.length > 0 && (
                        <img
                            src={selectedImageUrl || complaint.files[0].url}
                            alt="Complaint Preview"
                            className="w-[400px] h-[400px] rounded-lg shadow-lg object-cover"
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
                                } shadow-sm`}
                                onClick={() => setSelectedImageUrl(file.url)}
                            />
                        ))}
                    </div>
                </div>

                {/*Complaint Description */}
                <h1 className="font-bold text-2xl mt-5">Complaint Description</h1>
                <p className="mt-2">
                 {complaint.description}
                </p>

                {/* Deadline of Work */}
                <div className='flex flex-row gap-x-8 justify-center items-center mt-5 mb-5'>
                    <div className='w-8 h-8 rounded-full bg-red-600'></div>
                    <h1 className='text-red-700 font-bold text-xl'>Deadline :  {endDate}</h1>
                    <div className='w-8 h-8 rounded-full bg-red-600'></div>
                </div>

                {/* Allocation work to workers */}
                <div>
                    <h1 className='font-bold text-2xl mb-5'>Work Selection To Work Members</h1>
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center gap-x-5'>
                            <div className='flex flex-col gap-y-4'>
                                {
                                    data.map((val,i)=>
                                    <div className='flex flex-row items-center gap-x-5' key={i}>
                                        <h2 className='font-bold'>{i+1} Worker</h2>
                                        <input className='outline-2 outline-offset-2 outline-black' type="text" name='worker' value={val.Worker} onChange={(e)=>handleChange(e,i)}/>
                                        <button onClick={handleClick} ><img src="https://cdn-icons-png.flaticon.com/512/2661/2661440.png" alt="Add" width={30}/></button>
                                        <button onClick={()=>handleDelete(i)}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST1mtZCRWh6vOvjwovfizM2BvKFMTiCDawFw&s" alt="delete" width={30}/></button>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/*Submit Button */}
                <button onClick={handleSubmit} className={'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-5 rounded cursor-pointer'}>Submit</button>


                {/*Complaint Location */}
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
    )
}

export default ComplaintDetailsLeader