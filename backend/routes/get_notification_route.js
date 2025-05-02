const express = require("express");
const router = express.Router();
const ReportCreation = require("../models/reportcreation");
const Complaint = require("../models/complaint");

// Route to fetch matching complaints with report details
router.get("/notifications/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch complaints by userId
        const complaints = await Complaint.find({ userId });

        if (!complaints.length) {
            return res.status(404).json({ message: "No complaints found for this user." });
        }

        // Fetch matching report data
        const reportDetails = await Promise.all(
            complaints.map(async (complaint) => {
                const report = await ReportCreation.findOne({ complaintTitle: complaint.title });

                if (report) {
                    return {
                        complaintTitle: report.complaintTitle,
                        complaintDescription: report.complaintDesc,
                        complaintStatus: report.complaintStatus,
                        complaintImages: report.complaintImages
                    };
                }
                return null;
            })
        );

        // Remove null values from unmatched complaints
        const filteredReports = reportDetails.filter(report => report !== null);

        if (!filteredReports.length) {
            return res.status(404).json({ message: "No matching reports found." });
        }

        res.status(200).json(filteredReports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Error retrieving reports" });
    }
});

module.exports = router;
