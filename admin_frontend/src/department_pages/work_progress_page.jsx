import DepNavBar from "../department_components/dep_nav_bar";
import WorkProgressTable from "../department_components/work_progress_table";
import { useLocation } from "react-router-dom";

function WorkProgress() {
    const location = useLocation();
    const { departmentName } = location.state || {};

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 flex ml-4">
            <DepNavBar />
            <div className="w-0.5 bg-gray-500 h-screen ml-5 mr-5"></div>
            <div className="ml-5">
                <h1 className="font-bold text-2xl mt-5">Work Progress</h1>
                <input type="search" name="search" id="" />
                <WorkProgressTable departmentName={departmentName} />
            </div>
        </div>
    );
}

export default WorkProgress;
