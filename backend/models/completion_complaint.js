const mongoose = require("mongoose");

const CompletionComplaintSchema = new mongoose.Schema({
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    complaintStatus: { type: String, required: true },
    complaintImages: [
        { url: String, id: String },
    ],
});

const CompletionComplaint = mongoose.model("CompletionComplaint", CompletionComplaintSchema);

module.exports = CompletionComplaint;
