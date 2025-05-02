const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const Signup = require('../models/signup'); // Signup collection model
const Department = require('../models/department'); // Department collection model
const WorkLeadersWorks = require('../models/work_leaders_works');

// Login Route
router.post("/adminlogin", async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Check if the user exists in the Signup collection
        const user = await Signup.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check if the user's role matches any departmentName in the Department collection
        const department = await Department.find({ departmentName: user.role }).populate({
            path: 'complaintId',
            populate: {
                path: 'userId',
                model: 'User', // Your User model name
            },
        });
        if (!department) {
            return res.status(404).json({ message: "No matching department found" });
        }

        // Extract the first word from the user's role
        const userRoleFirstWord = user.role.split(" ")[0];

        // Find matching team leader works based on departmentName's first word
        const teamLeaderWorks = await WorkLeadersWorks.find({
            departmentName: { $regex: `^${userRoleFirstWord}`, $options: "i" }, // Match case-insensitively
        }).populate({
            path: "complaintId",
            populate: { path: "userId", model: "User" },
        });

        const endDate = teamLeaderWorks.length > 0 ? teamLeaderWorks[0].endDate : null;

        // Generate JWT token
        const token = jwt.sign(
            { userName: user.userName, role: user.role },
            "your_secret_key", // Replace with a strong secret key
            { expiresIn: "2h" }
        );

        // Respond with departmentName and token
        res.status(200).json({
            message: "Login successful",
            token, // Send the JWT token
            role: user.role, // Send the user's role
            department,
            teamleader: teamLeaderWorks,
            endDate: teamLeaderWorks.length > 0 ? teamLeaderWorks[0].endDate.toISOString().split('T')[0] : null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/complaints/department/:departmentName', async (req, res) => {
    try {
        const department = await Department.find({ departmentName: req.params.departmentName })
        .populate({
            path: 'complaintId',
            populate: { path: 'userId', model: 'User' },
        });
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      const complaints = department.flatMap(dept => dept.complaintId);
  
      res.status(200).json(complaints);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
