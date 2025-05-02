const express = require("express");
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
const fs = require('fs');
const Complaint = require("../models/complaint");

const router = express.Router();

// Upload Images to Cloudinary
// const uploadToCloudinary = async (filePath) => {
//     try {
//         const result = await cloudinary.uploader.upload(filePath, {
//             folder: "complaints",
//             resource_type: "image",
//         });
//         fs.unlinkSync(filePath); // Delete file from server after upload
//         return result.secure_url; // Return the image URL
//     } catch (error) {
//         console.error("Cloudinary upload error:", error);
//         throw new Error("Failed to upload image");
//     }
// };

// Create Complaint Route
router.post('/complaint', async (req, res) => {
    try {
        const { title, description, url, pLevel, files,userId  } = req.body;

        // let uploadedImages = [];
        // for (const file of files) {
        //     const imageUrl = await uploadToCloudinary(file.path);
        //     uploadedImages.push(imageUrl);
        // }

        // Creating the Complaint
        const complaint = new Complaint({
            title,
            description,
            url,
            pLevel,
            files,
            userId 
        });

        await complaint.save();

        return res.status(200).json({
            success: true,
            message: "Complaint created successfully",
            data: complaint
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
