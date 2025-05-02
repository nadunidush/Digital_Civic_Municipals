import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import DataTable from "react-data-table-component"
import NavBar from "../admin_components/nav_bar"

const customStyles = {
    headRow:{
        style:{
            backgroundColor: "black",
            color:"white",
        }
    },
    headCells:{
        style:{
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "uppercase"
        }
    },
    cells:{
        style:{
            fontSize:"15px"
        }
    },
};

function ClientProfilePage(){
    const column = [
        {name:"Id", selector: row => row._id.toString().slice(-3), sortable:true, width: "80px"   },
        {name:"Name", selector: row => row.userName, sortable:true, width: "190px"   },
        {name:"Address", selector: row => row.address, sortable:true, width: "300px"   },
        {name:"Email", selector:row => row.email,   sortable:true, width: "240px"},
        {name:"Phone Num", selector: row => row.phoneNumber, sortable:true, width: "130px"   },
        //{name:"C Count", selector: row => row.address.geo.lng,  sortable:true, width: "150px"   },
    ]

    useEffect(() => {
        const fetData = async () =>{
            axios.get('http://localhost:8080/user')
            .then(res => {
                setRecord(res.data) 
                setFilterRecord(res.data)})
            .catch(err => console.log(err));
        }
        fetData();
    }, [])

    const [records, setRecord] = useState([])
    const [filterRecords, setFilterRecord] = useState([])
    const handleFilter = (event) =>{
        const newData = filterRecords.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setRecord(newData);
    }
    return(
        <>
            <div className="flex flex-row justify-start m-0">
                <NavBar/>
                <div className="w-0.5 bg-gray-500 h-vh ml-5 mr-5"></div>
                <div>
                    <h1 className="font-bold text-2xl mt-5">Client Profiles</h1>
                    <div className="flex justify-end px-2 py-3 mb-2"><input className="outline-solid rounded-sm px-2 py-1" type="search" name="search" id="" placeholder="Search..." onChange={handleFilter}/></div>
                    <DataTable className=""  columns={column} data={records} fixedHeader  pagination selectableRows customStyles={customStyles} responsive ></DataTable>
                </div>
            </div>
        </>
    )
}

export default ClientProfilePage