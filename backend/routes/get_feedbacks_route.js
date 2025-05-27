const express = require("express");
const router = express.Router();
const CitizensFeedback = require("../models/citizensfeedbacks");
const CompletionComplaint = require("../models/completion_complaint");
const Department = require("../models/department");
const User = require("../models/users");

// Route to fetch citizen feedback based on departmentName
router.get("/citizen-feedback/:departmentName", async (req, res) => {
    const { departmentName } = req.params;

    try {
        // Step 1: Find department using departmentName
        const department = await Department.findOne({ departmentName }).exec();

        if (!department) {
            return res.status(404).json({ message: "Department not found." });
        }

        // Step 2: Find completion complaints associated with this department
        const completionComplaints = await CompletionComplaint.find({ departmentId: department._id }).exec();

        if (!completionComplaints.length) {
            return res.status(404).json({ message: "No completion complaints found for this department." });
        }

        // Step 3: Extract completionComplaintIds
        const completionComplaintIds = completionComplaints.map(complaint => complaint._id);

        // Step 4: Find all citizen feedbacks related to completion complaints
        const feedbacks = await CitizensFeedback.find({ completionComplaintId: { $in: completionComplaintIds } })
            .populate({ path: "userId", select: "userName email image" })
            .exec();

        if (!feedbacks.length) {
            return res.status(404).json({ message: "No feedback found for this department." });
        }

        // Step 5: Format the response with user details and departmentName
        const formattedFeedbacks = feedbacks.map(feedback => ({
            description: feedback.description,
            userName: feedback.userId ? feedback.userId.userName : "Unknown",
            email: feedback.userId ? feedback.userId.email : "No email",
            image: feedback.userId && feedback.userId.image.length > 0 ? feedback.userId.image[0].url : "https://img.freepik.com/premium-photo/young-man-isolated-blue_1368-124991.jpg?semt=ais_hybrid&w=740",
            departmentName: department.departmentName, // Add department name to response
        }));

        res.status(200).json(formattedFeedbacks);

    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Error retrieving feedback.", error: error.message });
    }
});

module.exports = router;
