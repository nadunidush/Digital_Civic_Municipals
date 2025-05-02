
const mongoose = require("mongoose"); 

//Complaint Schema
const departmentSchema = new mongoose.Schema({
    departmentName: String,
    complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
});


const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;