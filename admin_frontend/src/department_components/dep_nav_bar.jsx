import { Link, useLocation } from "react-router-dom";

function DepNavBar() {
    const location = useLocation(); // Get the current state from the parent route
    const { departmentName, complaints } = location.state || {}; // Extract state

    return (
        <>
            <div className="pl-5 pt-5 mr-5">
                {/* Logo */}
                <img className="mx-auto w-20 h-20 mb-5" src="src/assets/images/logo.png" alt="Logo" />

                {/* All Complaints */}
                <Link
                    to={{
                        pathname: "/allcomplaintdep",
                    }}
                    state={{ departmentName, complaints }} // Pass state
                >
                    <div className="flex flex-row">
                        <img className="w-8" src="./src/assets/images/all.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">DashBoard</h1>
                    </div>
                </Link>

                {/* Work Progress */}
                <Link
                    to={{
                        pathname: "/workprogress",
                    }}
                    state={{ departmentName, complaints }} // Pass state
                >
                    <div className="flex pt-5">
                        <img className="w-8" src="./src/assets/images/department.png" alt="Work Progress" />
                        <h1 className="ml-5 font-medium">Work Progress</h1>
                    </div>
                </Link>

                {/* Feedbacks */}
                <Link
                    to={{
                        pathname: "/citizenfeedback",
                    }}
                    state={{ departmentName, complaints }} // Pass state
                >
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/statistics.png" alt="Feedbacks" />
                        <h1 className="ml-5 font-medium">Feedbacks</h1>
                    </div>
                </Link>

                {/* Messages */}
                <Link
                    to={{
                        pathname: "/messages",
                    }}
                    state={{ departmentName, complaints }} // Pass state
                >
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/comparison.png" alt="Messages" />
                        <h1 className="ml-5 font-medium">Messages</h1>
                    </div>
                </Link>

                {/* Profile */}
                <Link
                    to={{
                        pathname: "/departmentprofile",
                    }}
                    state={{ departmentName, complaints }} // Pass state
                >
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/profile.png" alt="Profile" />
                        <h1 className="ml-5 font-medium">Profile</h1>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default DepNavBar;
