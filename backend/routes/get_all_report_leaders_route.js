const express = require("express");
const router = express.Router();
const Department = require("../models/department"); // Adjust the path according to your project structure
const ReportCreation = require("../models/reportcreation");

router.get("/leaders-with-complaints", async (req, res) => {
    const { departmentName } = req.query; // Extract departmentName from query params

    try {
        if (!departmentName) {
            return res.status(400).json({ error: "Department name is required" });
        }

        // Extract only the first word of departmentName
        const firstWord = departmentName.split(" ")[0];

        // Fetch departments that match the first word
        const departments = await Department.find({ 
            departmentName: new RegExp(`^${firstWord}`, "i") })
            .populate({
                path: "complaintId",
                populate: { path: "userId", model: "User" },
            });

        const updatedDepartments = await Promise.all(departments.map(async (department) => {
            if (department.complaintId) {
                // Fetch matching reports where first word of department matches
                const report = await ReportCreation.findOne({
                    complaintTitle: department.complaintId.title,
                    department: new RegExp(`^${firstWord}`, "i"),
                });

                return {
                    ...department.toObject(),
                    complaintStatus: report ? report.complaintStatus : "No Status Found",
                    complaintImages: report ? report.complaintImages : [],
                };
            }

            return {
                ...department.toObject(),
                complaintStatus: "No Complaint Linked",
            };
        }));

        res.status(200).json(updatedDepartments);
    } catch (error) {
        console.error("Error fetching filtered leaders:", error);
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;