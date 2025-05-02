const mongoose = require("mongoose");

const ReportCreationSchema = new mongoose.Schema({
    complaintTitle: { type: String, required: true },
    complaintDesc: { type: String, required: true },
    complaintImages: [
        { url: String, id: String },
    ],
    complaintStatus: { type: String, enum: ["Pending", "Inprogress", "Completed"], required: true },
    department: { type: String, required: true },
});

const ReportCreation = mongoose.model("ReportCreation", ReportCreationSchema);

module.exports = ReportCreation;
