import { Chart as ChartJS , defaults} from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import YearData from "../admin_data/year_data.json"

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;


defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 30;
defaults.plugins.title.color = "black";

function YearChart(){
    return (
        <>
        <div>
            <Line
                data={
                    {
                        labels: YearData.map((data) => data.label),
                        datasets:[
                            {
                                label:"Year",
                                data: YearData.map((data) =>data.value),
                                backgroundColor: "#064FF0",
                                borderColor: "#064FF0"
                            }
                        ]
                    }
                }
                options={{
                   elements:{
                    line:{
                        tension: 0.5,
                    }
                   },
                    plugins:{
                        title:{
                            text: "Year",
                            font: { size: 25 }
                        }
                    }
                }}
                width={500}
                height={300}
            />
        </div>
        </>
    )
}

export default YearChart