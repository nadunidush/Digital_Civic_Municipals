function DepComplaintTile({ title, priority, status,image,complaintStatus }) {
    return (
        <>
            <div className="w-70 mt-4 mb-4 p-5 bg-gray-100 shadow-md shadow-gray-400 rounded-lg">
                <div className="flex justify-center items-center">
                    <h1 className="text-lg font-semibold mb-2">{title}</h1>
                </div>
                <img className="w-65 h-55 rounded-lg" src={image} alt="complaint image" />

                {/* Row of complaint details */}
                <div className="flex flex-row mt-2 justify-between">
                    <img className="w-5" src="src/assets/icons/priority_level.png" alt="Priority Level" />
                    <p>Priority Level</p>
                    <p className="text-orange-900 font-bold">{priority}</p>
                </div>

                <div className="flex flex-row mt-2 justify-between">
                    <img className="w-5" src="src/assets/icons/workflow.png" alt="Workflow" />
                    <p>WorkFlow</p>
                    <p className="text-purple-900 font-bold">{complaintStatus}</p>
                </div>

                <div className="flex flex-row mt-2 justify-between">
                    <img className="w-5" src="src/assets/icons/complaint.png" alt="Complaint" />
                    <p>Status</p>
                    <p className="text-green-900 font-bold">{status}</p>
                </div>
            </div>
        </>
    );
}

export default DepComplaintTile;
