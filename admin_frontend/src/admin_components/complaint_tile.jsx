import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
function ComplaintTile ({ Bgcolor = 'black', color = 'white', Navigator, complaintName, complaintDesc, files, complaintId, status, complaint, departmentName, endDate}){
    const navigate = useNavigate();

    

    const handleViewDetails = () => {
        navigate(`${Navigator}/${complaintId}`, { 
            state: { 
                complaint: complaint,
                departmentName: departmentName, // Pass the departmentId
                endDate:endDate
            } 
        });
    };
    return(
        <>
            <div className="p-3 mt-5 mr-5 ml-4 bg-gray-100 shadow-lg shadow-gray-400 rounded-xl w-70">
                <div className="flex justify-center items-center mb-3 mt-2">
                    <h1 className="font-bold text-xl">{complaintName}</h1>
                </div>
                <div className="flex justify-center items-center mb-3">
                {files?.length > 0 && (
                    <img 
                        src={files[0].url} 
                        alt="Complaint Preview" 
                        className="h-55"
                    />
                )}
                </div>
                <p>{complaintDesc}</p>
                    <div className="flex justify-center items-center ">
                        <button onClick={handleViewDetails}  style={{backgroundColor: Bgcolor, color: color}} className="p-2 text-white font-medium rounded-lg cursor-pointer" type="button">See More</button>
                    </div>
                    {status === 'new' && (
                        <p className="p.new bg-gradient-to-r from-sky-500/25 to-sky-500/75 w-12 flex justify-center items-center rounded-2xl">New</p>
                    )}
              
            </div>
        </>
    )
}

export default ComplaintTile