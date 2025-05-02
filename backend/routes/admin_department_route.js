const express = require("express");
const router = express.Router();
const Department = require("../models/department"); // Adjust the path according to your project structure
const ReportCreation = require("../models/reportcreation");


// Route to get all complaint details
router.get("/departments-with-complaints", async (req, res) => {
    try {
        const departments = await Department.find()
            .populate({
                path: "complaintId",
                populate: { 
                    path: "userId", 
                    model: "User" // Populates userId with all User model fields
                },
            }); // Populate the complaintId field with data from the Complaint collection

        // Map through departments and check for matching complaint titles
        const updatedDepartments = await Promise.all(departments.map(async (department) => {
            if (department.complaintId) {
                // Fetch the corresponding report from ReportCreation
                const report = await ReportCreation.findOne({
                    complaintTitle: department.complaintId.title, // Match title from Complaint schema
                });

                // Add complaintStatus and complaintImages from ReportCreation if a match is found
                return {
                    ...department.toObject(),
                    complaintStatus: report ? report.complaintStatus : "No Status Found", // Add complaintStatus or a default value
                    complaintImages: report ? report.complaintImages : [],
                };
            }

            return {
                ...department.toObject(),
                complaintStatus: "No Complaint Linked", // Default if no complaintId exists
            };
        }));

        res.status(200).json(updatedDepartments); // Send the modified data to the frontend
    } catch (error) {
        console.error("Error fetching departments with complaints:", error);
        res.status(500).json({ error: "Server error" });
    }
});




module.exports = router;
