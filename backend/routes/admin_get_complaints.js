const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");
const User = require("../models/users");

router.get('/complaints', async (req, res) => {
    try {
        const allData = await Complaint.find();
        res.json(allData);
    } catch (err) {
        res.status(500).send(err.message);
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