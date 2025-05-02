const mongoose = require("mongoose");

// Citizens Feedback Schema
const CitizensFeedbackSchema = new mongoose.Schema({
    completionComplaintId: { type: mongoose.Schema.Types.ObjectId, ref: "CompletionComplaint", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
});

const CitizensFeedback = mongoose.model("CitizensFeedback", CitizensFeedbackSchema);
module.exports = CitizensFeedback;
