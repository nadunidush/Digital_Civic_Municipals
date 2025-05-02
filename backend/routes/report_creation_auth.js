const express = require('express');
const multer = require('../config/multer'); 
const cloudinary = require('../config/cloudinary');
const router = express.Router();
const ReportCreation = require('../models/reportcreation');
const WorkLeadersWorks = require('../models/work_leaders_works');
const Department = require('../models/department');

// Endpoint to handle report creation
router.post('/create-report', multer.array('complaintImages'), async (req, res) => {
    const { complaintTitle, complaintDesc,  complaintStatus, department } = req.body;

    try {
        // Fetch all WorkLeadersWorks documents and populate complaintId
        const workLeaderWorks = await WorkLeadersWorks.find({}).populate('complaintId'); // Returns an array of documents

        if (!workLeaderWorks || workLeaderWorks.length === 0) {
            // If no work leader works exist, return an error
            return res.status(400).json({ message: "No work leader works found in the database." });
        }

        // Extract all complaint titles from the populated Complaint objects
        const complaintTitles = workLeaderWorks
            .filter(work => work.complaintId) // Ensure complaintId exists
            .map(work => work.complaintId.title); // Extract titles

        // Check if the submitted complaintTitle exists in the complaintTitles array
        if (!complaintTitles.includes(complaintTitle)) {
            // If the title does not match any in the list, return an error
            return res.status(400).json({ message: "Complaint title does not match any title in the Complaint collection." });
        }

        // Upload images to Cloudinary
        const imageUploads = await Promise.all(
            req.files.map(file =>
                cloudinary.uploader.upload(file.path, { folder: 'reports' })
            )
        );

        // Get URLs and IDs from Cloudinary response
        const complaintImages = imageUploads.map(upload => ({
            url: upload.secure_url,
            id: upload.public_id
        }));

        const existingReport = await ReportCreation.findOne({ complaintTitle });

        if (existingReport) {
            // If a report exists, update it
            existingReport.complaintDesc = complaintDesc;
            existingReport.complaintStatus = complaintStatus;
            existingReport.department = department;
            existingReport.complaintImages = complaintImages; // Replace old images with new ones

            await existingReport.save(); // Save updated report to the database
            return res.status(200).json({ message: "Report updated successfully!" });
        } else {
            // If no report exists, create a new one
            const newReport = new ReportCreation({
                complaintTitle,
                complaintDesc,
                complaintImages,
                complaintStatus,
                department,
            });

            await newReport.save(); // Save new report to the database
            return res.status(201).json({ message: "Report created successfully!" });
        }

    } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ message: "Failed to create report." });
    }
});


router.get('/reports/department/:departmentName', async (req, res) => {
    try {
        const { departmentName } = req.params;

        // Validate input
        if (!departmentName) {
            return res.status(400).json({ message: "Department name is required." });
        }

        // Fetch department and populate complaint details
        const department = await Department.find({ departmentName })
            .populate({
                path: "complaintId", // Populate complaints linked to the department
            });

        if (!department || department.length === 0) {
            return res.status(404).json({ message: "Department not found or no complaints available." });
        }

        // Extract complaints from the department
        const complaints = department.flatMap((dept) => dept.complaintId);

        if (!complaints || complaints.length === 0) {
            return res.status(404).json({ message: "No complaints found for this department." });
        }

        // Fetch matching reports from ReportCreation schema using complaintTitle
        const reports = await ReportCreation.find({
            complaintTitle: { $in: complaints.map((complaint) => complaint.title) }, // Match complaintTitle
        });

        // Combine complaints with their statuses from ReportCreation
        const combinedData = complaints.map((complaint) => {
            const matchingReport = reports.find((report) => report.complaintTitle === complaint.title); // Match titles
            return {
                complaintId: complaint._id || "Unknown ID",
                complaintTitle: complaint.title || "Unknown Title",
                complaintDescription: complaint.description || "No Description Provided",
                complaintStatus: matchingReport ? matchingReport.complaintStatus : "Unknown", // Default to "Unknown" if no matching report is found
            };
        });

        // Respond with the combined data
        res.status(200).json(combinedData);
    } catch (error) {
        console.error("Error fetching reports by department:", error);
        res.status(500).json({ message: "Internal server error occurred. Please try again later." });
    }
});

module.exports = router;



module.exports = router;
