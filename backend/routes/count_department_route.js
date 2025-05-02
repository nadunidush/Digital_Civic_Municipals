const express = require("express");
const router = express.Router();
const Department = require("../models/department");

// Route to get complaint count by department name
router.get("/complaint-count-by-department", async (req, res) => {
    try {
        const complaintCounts = await Department.aggregate([
            {
                $group: {
                    _id: "$departmentName", // Group by departmentName
                    count: { $sum: 1 }, // Count the number of documents per departmentName
                },
            },
        ]);

        const result = complaintCounts.map((item) => ({
            departmentName: item._id,
            complaintCount: item.count,
        }));

        res.status(200).json(result); // Send the grouped data to the frontend
    } catch (error) {
        console.error("Error fetching complaint counts:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
