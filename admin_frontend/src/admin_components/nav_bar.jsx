import {Link} from "react-router-dom"
function NavBar() {
    return (
        <>
            <div className="pl-5 pt-5">

                {/* Logo */}
                <img className="mx-auto w-20 h-20 mb-5" src="src/assets/images/logo.png" alt="Logo" />

                {/* All Complaints */}
                <Link to="/allcomplaintadmin">
                    <div className="flex flex-row">
                        <img className="w-8" src="./src/assets/images/all.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">DashBorad</h1>
                    </div>
                </Link>
                {/* Department */}
                <Link to="/department">
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/department.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">Departments</h1>
                    </div>
                </Link>
                {/* Statistics */}
                <Link to="/statistics">
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/statistics.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">Statistics</h1>
                    </div>
                </Link>
                {/* Comparison */}
                <Link to="/comparison">
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/comparison.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">Comparison</h1>
                    </div>
                </Link>
                {/* Profile */}
                <Link to="/userprofile">
                    <div className="flex flex-row pt-5">
                        <img className="w-8" src="./src/assets/images/profile.png" alt="All Complaints" />
                        <h1 className="ml-5 font-medium">Profile</h1>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default NavBar