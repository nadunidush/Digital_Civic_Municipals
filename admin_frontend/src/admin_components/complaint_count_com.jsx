
function ComplaintCountCom({complaintName, complaintCount}){
    return(
        <>
           <div className="bg-[#195F6A] w-60 p-3 rounded-lg h-min">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-white text-lg">{complaintName}</h1>
                    <p className="text-white font-light text-md">{complaintCount}</p>
                </div>
           </div>
        </>
    )
}

export default ComplaintCountCom