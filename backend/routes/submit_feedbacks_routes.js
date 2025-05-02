const express = require("express");
const router = express.Router();
const CitizensFeedback = require("../models/citizensfeedbacks"); 

// Route to submit feedback
router.post("/submit-feedback", async (req, res) => {
    const { completionComplaintId, userId, description } = req.body;

    // Validate inputs
    if (!completionComplaintId || !userId || !description) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        // Create a new feedback entry
        const newFeedback = new CitizensFeedback({
            completionComplaintId,
            userId,
            description
        });

        await newFeedback.save(); // Save to database

        res.status(201).json({ message: "Feedback submitted successfully!", feedback: newFeedback });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
