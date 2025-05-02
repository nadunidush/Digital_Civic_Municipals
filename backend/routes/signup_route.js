const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // npm install bcrypt
const router = express.Router();

const Signup = require('../models/signup'); // Your User model

// Route: Signup
router.post("/adminsignup", async (req, res) => {
    const { role, userName, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await Signup.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new Signup({
        role,
        userName,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
