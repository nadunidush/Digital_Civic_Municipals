const express = require("express");
const Complaint = require("../models/complaint"); // Adjust the path if different
const Department = require("../models/department"); // Adjust the path if different
const CompletionComplaint = require("../models/completion_complaint"); // Adjust the path if different
const router = express.Router();

// Route to fetch complaints by userId, including departmentName and complaintStatus
router.get("/citizen-complaints/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch complaints based on userId
        const complaints = await Complaint.find({ userId });

        // Add departmentName and complaintStatus to each complaint
        const enrichedComplaints = await Promise.all(
            complaints.map(async (complaint) => {
                // Fetch department info based on complaintId
                const department = await Department.findOne({ complaintId: complaint._id });

                // Fetch completion complaint info based on departmentId
                const completionComplaint = department
                    ? await CompletionComplaint.findOne({ departmentId: department._id })
                    : "Checking";

                return {
                    ...complaint._doc, // Include original complaint details
                    departmentName: department ? department.departmentName : "No Department",
                    complaintStatus: completionComplaint ? completionComplaint.complaintStatus : "Checking",
                };
            })
        );

        // Send enriched complaints as a response
        res.status(200).json(enrichedComplaints);
    } catch (error) {
        console.error("Error fetching complaints:", error);
        res.status(500).json({ message: "Error fetching complaints" });
    }
});


// Route to get all complaint count by userId
router.get("/complaint-count/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Count total complaints for the given userId
        const count = await Complaint.countDocuments({ userId });

        res.status(200).json({ totalComplaints: count });
    } catch (error) {
        console.error("Error fetching complaint count:", error);
        res.status(500).json({ message: "Error retrieving complaint count" });
    }
});

module.exports = router;



module.exports = router;
