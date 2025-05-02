// routes/department.js
const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const Complaint = require('../models/complaint');

// Link complaint to department
router.post('/departments', async (req, res) => {
    try {
        const { departmentName, complaintId } = req.body;

        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
          }
        
        complaint.status = 'assigned';
        await complaint.save(); // Save the updated status
        
        const newDepartment = new Department({
            departmentName,
            complaintId
        });

        await newDepartment.save();
        res.status(201).json(newDepartment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//Get complaint by ID
router.get('/complaints/:id', async (req, res) => {
    try {
      const complaint = await Complaint.findById(req.params.id).populate('userId');
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
      res.status(200).json(complaint);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
