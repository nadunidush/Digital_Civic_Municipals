const express = require("express");
const router = express.Router();
const CompletionComplaint = require("../models/completion_complaint");
const Department = require("../models/department");
const Complaint = require("../models/complaint");

// Route to fetch completion complaints with details
router.get("/completed-complaints/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Step 1: Find complaints by userId
        const complaints = await Complaint.find({ userId });

        // Step 2: Retrieve department and completion complaint details for each complaint
        const enrichedComplaints = await Promise.all(
            complaints.map(async (complaint) => {
                const department = await Department.findOne({ complaintId: complaint._id });

                if (!department) return null; // If no department is found, skip this complaint
                
                const completionComplaint = await CompletionComplaint.findOne({ departmentId: department._id });

                return {
                    _id: complaint._id,
                    completionId: completionComplaint ? completionComplaint._id : "Not haved",
                    title: complaint.title,
                    description: complaint.description,
                    url: complaint.url || "No Location Provided",
                    files: complaint.files, // Original complaint images
                    departmentName: department.departmentName,
                    complaintStatus: completionComplaint ? completionComplaint.complaintStatus : "Pending",
                    completionImages: completionComplaint ? completionComplaint.complaintImages : [],
                };
            })
        );

        // Filter out any null values (complaints that didn't match the department)
        res.status(200).json(enrichedComplaints.filter(c => c !== null));
    } catch (error) {
        console.error("Error fetching completed complaints:", error);
        res.status(500).json({ message: "Error retrieving completed complaints" });
    }
});

module.exports = router;
