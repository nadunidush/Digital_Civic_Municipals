import NavBar from "../admin_components/nav_bar";
import YearChart from "../admin_charts/year_chart";
import MonthChart from "../admin_charts/month_chart";
import WeekChart from "../admin_charts/week_chart";
import PieChart from "../admin_charts/pie_chart";
import BarChart from "../admin_charts/bar_chart";
 
function ComplaintStatistic(){
    return (
        <>
            <div className="flex flex-row">
                {/* Nav Bar*/}
                <NavBar/>


                {/* Middle Line*/}
                <div className="w-0.5 bg-gray-500 h-vh ml-12"></div>

                <div className="ml-5">
                    <h1 className="font-bold text-2xl mt-5 mb-5">Complaint Statistics</h1>
                    <h1 className="font-bold text-xl mt-5 mb-5 text-orange-700 flex justify-center intems-center">Total Complaints Statistics</h1>

                    {/*Line Charts*/}
                    <div className="flex flex-wrap">
                        <div className="">
                            <YearChart/>
                        </div>
                        <div className="">
                            <MonthChart/>
                        </div>
                        <div className="mx-auto pt-5">
                            <WeekChart/>
                        </div>
                    </div>

                    
                     {/* Pie Chart*/}
                    <h1 className="font-bold text-xl text-orange-700 mt-30 flex flex-row justify-center item-center">All Department Works Summary</h1>
                    <div>
                        <PieChart/>
                    </div>


                    {/* Bar Chart*/}
                    <h1 className="font-bold text-xl text-orange-700 mt-30 flex flex-row justify-center item-center">Department Statistics</h1>
                    <div>
                        <BarChart/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComplaintStatistic