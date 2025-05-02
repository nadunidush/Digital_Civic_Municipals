import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SendToCitizen(){
    const location = useLocation();
    const {
        complaintId,
        complaintTitle,
        complaintDescription,
        complaintImages,
        complaintStatus,
        complaintPlevel,
        complaintUrl,
        complaintDepartment,
        user, // User details are included here
    } = location.state || {};
    const mapHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63211.112735741204!2d79.8327393!3d8.03039615!2m3!1f0!2f3!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afd15c36ebacc9d%3A0x5a279a17759deffa!2sPuttalam!5e0!3m2!1sen!2slk!4v1741958612121!5m2!1sen!2slk" width="800" height="450" style="border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>`;

    // select the image
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    useEffect(() => {
        if (complaintImages && complaintImages?.length > 0) {
            setSelectedImageUrl(complaintImages[0].url);
        }
        }, [complaintImages]);
    if (!complaintImages) {
        return <p>Complaint details not found.</p>;
    }
    return (
        <>
            <div className="px-10 py-10">
                <h1 className="font-bold text-2xl text-red-700 mb-5 flex flex-row justify-center items-center">{complaintTitle}</h1>
                <div className="flex flex-row gap-x-10 justify-center items center">
                {complaintImages?.length > 0 && (
                        <img
                            src={selectedImageUrl || complaintImages[0].url}
                            alt="Complaint Preview"
                            className="h-110 w-110 rounded-lg"
                        />
                    )}
                    <div className="flex flex-col gap-y-5">
                        {complaintImages?.map((file, index) => (
                            <img
                                key={index}
                                src={file.url}
                                alt={`Complaint Preview ${index + 1}`}
                                className="w-45 h-45 rounded-lg cursor-pointer"
                                onClick={() => setSelectedImageUrl(file.url)}
                            />
                        ))}
                    </div>
                </div>

                {/*Complaint Description */}
                <h1 className="font-bold text-2xl mt-5">Complaint Description</h1>
                <p className="mt-2">
                    {complaintDescription}
                </p>

                {/*User's Details */}
                <div className="mt-8 flex flex-row gap-x-40">
                    <div>
                        <div className="flex flex-row gap-x-8">
                            <p className="font-bold">User Name:</p>
                            <p>{user.userName}</p>
                        </div>
                        <div className="flex flex-row gap-x-8 mt-3">
                            <p className="font-bold">User Address:</p>
                            <p>{user.address}</p>
                        </div>
                        <div className="flex flex-row gap-x-8 mt-3">
                            <p className="font-bold">Priority Level:</p>
                            <p>{complaintPlevel}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-x-8">
                            <p className="font-bold">User Email:</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex flex-row gap-x-8 mt-3">
                            <p className="font-bold">User Phone num:</p>
                            <p>{user.phoneNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Work section and Status of work */}
                <div className='mt-10 mb-5'>
                    <table>
                        <tr>
                            <th><p className='pr-8'>Work Section:</p></th>
                            <td><p>{complaintDepartment}</p></td>
                        </tr>
                        <tr>
                            <th className='text-start'><p>Status:</p></th>
                            <td><p className='text-green-700 font-bold'>{complaintStatus}</p></td>
                        </tr>
                    </table>
                </div>
                {/*Submit Button */}
                <button className={'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-5 rounded cursor-pointer'}>Submit</button>


                {/* Report complaint to Team leader for correct complaint*/}
                <h1 className="font-bold text-2xl mt-10">Report Complaint</h1>
                <div className="mt-5 flex flex-row gap-x-10">
                    <p>Report Description: </p>
                    <textarea className='border-2 border-gray-400' name="report" id="" rows={"5"} cols={"50"}></textarea>
                </div>
                 
                {/*Submit report to Team leader */}
                <button className={'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-5 rounded cursor-pointer'}>Submit</button>  



                {/*Complaint Location */}
                <h1 className="font-bold text-2xl mt-10 mb-5">Complaint Location</h1>
                <a
                    href={complaintUrl}
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

export default SendToCitizen