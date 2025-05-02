const express = require("express");
const router = express.Router();
const Worker = require("../models/worker");

// Get all workers
router.get("/workers", async (req, res) => {
    const { departmentName } = req.query; // Get departmentName from query params
    
    try {
        let query = {}; // Default: fetch all workers
        if (departmentName) {
            query.department = departmentName; // Filter by department
        }

        const workers = await Worker.find(query);
        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workers", error });
    }
});


// Add a new worker
router.post("/workers", async (req, res) => {
    try {
        const { name, address, email, phone, department } = req.body;

        if (!name || !address || !email || !phone || !department) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newWorker = new Worker({ name, address, email, phone, department });
        await newWorker.save();
        
        res.status(201).json({ message: "Worker added successfully", worker: newWorker });
    } catch (error) {
        console.error("Error adding worker:", error); // Logging error
        res.status(500).json({ message: "Error adding worker", error: error.message });
    }
});


// Update worker details
router.put("/workers/:id", async (req, res) => {
    try {
        const updatedWorker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Worker updated successfully", worker: updatedWorker });
    } catch (error) {
        res.status(500).json({ message: "Error updating worker", error });
    }
});

// Delete worker
router.delete("/workers/:id", async (req, res) => {
    try {
        await Worker.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Worker deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting worker", error });
    }
});

module.exports = router;
