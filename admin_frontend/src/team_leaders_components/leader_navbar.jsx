import {Link} from "react-router-dom"
import { useLocation } from "react-router-dom";
function LeaderNavBar() {
    const location = useLocation();
    const { departmentName , endDate} = location.state || {};
    return (
        <>
            <div className="pl-5 pt-5 mr-5">

                {/* Logo */}
                <img className="mx-auto w-20 h-20 mb-5" src="src/assets/images/logo.png" alt="Logo" />

                {/* All Complaints */}
                <Link 
                    to={{ pathname: "/allcomplaintleader"}}
                    state={{ departmentName, endDate }}
                >
                    <div className="flex flex-row">
                        <img className="w-8" src="./src/assets/images/all.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">DashBorad</h1>
                    </div>
                </Link>
                {/* Department */}
                <Link 
                    to={{pathname:"/createreport"}}
                    state={{ departmentName, endDate }}
                >
                    <div className="flex pt-5">
                        <img className="w-8" src="./src/assets/icons/report.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">ReportCreation</h1>
                    </div>
                </Link>
                {/* Statistics */}
                <Link 
                    to={{pathname: "/allreportleader"}}
                    state={{ departmentName, endDate }}
                >
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/icons/all.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">AllReports</h1>
                    </div>
                </Link>
                {/* Comparison */}
                <Link 
                    to={{pathname:"/messages"}}
                    state={{ departmentName, endDate }}
                >
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/comparison.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">Messages</h1>
                    </div>
                </Link>
                {/* Profile */}
                <Link 
                    to={{pathname:"/teamleaderprofile"}}
                    state={{ departmentName, endDate }}
                >
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/profile.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">Profiles</h1>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default LeaderNavBar