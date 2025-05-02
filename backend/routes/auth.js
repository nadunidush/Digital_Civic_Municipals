const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/users");
const { default: mongoose } = require("mongoose");

const router = express.Router();

//Signup route
router.post('/signup', async (req, res) =>{
    const {userName, email, phoneNumber, address, password, image} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({userName, email, phoneNumber, address, password:hashPassword, image});
        await newUser.save();
        res.send("user signup successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//Login route
router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            res.json({userId: user._id, email: user.email, userName: user.userName});
        }else{
            res.status(404).send("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }
        // const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
        // res.send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Get user email
router.get('/signup', async (req, res) => {
    const email = req.query.email;
    try {
     const user = await User.findOne({email:email});
     if(user){
        res.json(user);
     }else{
        res.status(404).send("User not found");
     }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

 //Get User's Information
 router.get('/user/:id', async (req, res)=>{
     const userId = req.params.id;
     try {
         const user = await User.findById(userId);
         if(user)
         {
             res.json(user);
         }
         else{
             res.status(404).send("User not found");
         }
     } catch (error) {
         res.status(500).send(error.message);
     }
 });

 router.get('/user', async (req, res)=>{
    const userId = req.params.id;
    try {
        const user = await User.find();
        if(user)
        {
            res.json(user);
        }
        else{
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to update user name
router.put("/update-user/:userId", async (req, res) => {
    const { userId } = req.params;
    const { userName } = req.body;

    if (!userName) {
        return res.status(400).json({ message: "User name is required" });
    }

    try {
        // Update user name in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { userName },
            { new: true } // Return the updated user data
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User name updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user name:", error);
        res.status(500).json({ message: "Error updating user name" });
    }
});

module.exports = router;




module.exports = router;