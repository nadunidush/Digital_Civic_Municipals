import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
function ComparisonTile({title, description, department, complaintStatus, status,Navigator, image}){
    const navigate = useNavigate();

    

    const handleSeeMore = () => {
        navigate(Navigator); // Navigate to the provided URL
    };
    return (
        <>
            <div className="p-3 mt-5 mr-5 ml-4 bg-gray-100 shadow-lg shadow-gray-400 rounded-xl w-70">
                 
                <div className="flex justify-center items-center mb-3">
                    <img className="w-75 h-65 rounded-lg" src={image} alt="complaint" />
                </div>
                <h1 className="font-bold text-xl">{title}</h1>
                <p>{description}</p>
                <div className="flex flex-row gap-x-8 mt-5 mb-5">
                    <div>
                    <table>
                        <tr>
                            <td className="font-bold">Department</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Status</td>
                        </tr>
                    </table>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <td className="font-thin">{department}</td>
                            </tr>
                            <tr>
                                <td className="text-green-600">{complaintStatus}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center">
                    
                        <button onClick={handleSeeMore}  className="border p-2 bg-black text-white rounded-lg cursor-pointer" type="button">See More</button>
                  
                    {status === 'new' && (
                        <p className="p.new bg-gradient-to-r from-sky-500/25 to-sky-500/75 w-12 flex justify-center items-center rounded-2xl">New</p>
                    )}
                </div>
                
              
            </div>
        </>
    )
}

export default ComparisonTile