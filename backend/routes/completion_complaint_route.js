const express = require("express");
const router = express.Router();
const CompletionComplaint = require("../models/completion_complaint"); // Adjust the path based on your project structure

router.post("/create-completion-complaint", async (req, res) => {
    try {
        const {
            departmentId,
            complaintStatus,
            complaintImages,
        } = req.body;

        if (!departmentId || !complaintStatus) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newCompletionComplaint = new CompletionComplaint({
            departmentId,
            complaintStatus,
            complaintImages,
        });

        await newCompletionComplaint.save();

        res.status(201).json({ message: "Completion Complaint created successfully", data: newCompletionComplaint });
    } catch (error) {
        console.error("Error creating Completion Complaint:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
