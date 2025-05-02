const mongoose = require("mongoose");

const WorkLeadersWorksSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    departmentName: { type: String, required: true },
    complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint", required: true },
});

const WorkLeadersWorks = mongoose.model("WorkLeadersWorks", WorkLeadersWorksSchema);

module.exports = WorkLeadersWorks;
