const express = require("express");
const router = express.Router();
const ReportCreation = require("../models/reportcreation");

// Route to get department complaint statistics
router.get("/department-complaint-statistics", async (req, res) => {
    try {
        const complaintStats = await ReportCreation.aggregate([
            {
                $group: {
                    _id: { department: "$department", complaintStatus: "$complaintStatus" }, // Group by department and complaintStatus
                    count: { $sum: 1 }, // Count the number of complaints
                },
            },
        ]);

        // Transform data to have a clear structure
        const result = {};
        complaintStats.forEach((item) => {
            const department = item._id.department;
            const status = item._id.complaintStatus;

            if (!result[department]) {
                result[department] = { Pending: 0, Inprogress: 0, Completed: 0 };
            }

            if (status === "Pending") result[department].Pending += item.count;
            if (status === "Inprogress") result[department].Inprogress += item.count;
            if (status === "Completed") result[department].Completed += item.count;
        });

        res.status(200).json(result); // Send structured data to the frontend
    } catch (error) {
        console.error("Error fetching department complaint statistics:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
