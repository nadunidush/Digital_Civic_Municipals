const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const WorkLeadersWorks = require("../models/work_leaders_works"); // Import the schema
const ReportCreation = require('../models/reportcreation');
const Signup = require('../models/signup'); // Signup collection model
const Department = require('../models/department'); 

router.post("/workleadersworks", async (req, res) => {
    const { startDate, endDate, duration, departmentName, complaintId } = req.body;

    // Validate incoming data
    if (!startDate || !endDate || !duration || !departmentName || !complaintId) {
        return res.status(400).json({ message: "Invalid data provided" });
    }

    try {
        const newWorkLeaderWork = new WorkLeadersWorks({
            startDate,
            endDate,
            duration,
            departmentName,
            complaintId
        });

        const savedWorkLeaderWork = await newWorkLeaderWork.save();

        res.status(200).json({
            message: "WorkLeaderWork created successfully!",
            workLeaderWork: savedWorkLeaderWork,
        });
    } catch (error) {
        console.error("Error creating WorkLeaderWork:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/complaints/teamleader/:departmentName', async (req, res) => {
    try {
        // Extract the first word of the departmentName
        const firstWord = req.params.departmentName.split(" ")[0]; // Take the first word before the space

        // Find the matching work leader works based on the first word
        const workLeaderMatch = await WorkLeadersWorks.find({
            departmentName: { $regex: `^${firstWord}`, $options: "i" } // Case-insensitive match with regex
        }).populate({
            path: 'complaintId',
            populate: { path: 'userId', model: 'User' }, // Populate complaint details
        });

        if (!workLeaderMatch || workLeaderMatch.length === 0) {
            return res.status(404).json({ message: 'No matching departments or work leaders found' });
        }

        // Combine complaints from both collections
        const complaintsFromWorkLeaders = workLeaderMatch.flatMap((workLeader) => workLeader.complaintId);

        //const combinedComplaints = [...complaintsFromDepartments, ...complaintsFromWorkLeaders];

        res.status(200).json(complaintsFromWorkLeaders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/complaint/teamleader/:departmentName', async (req, res) => {
    try {
        // Extract the first word of the departmentName
        const firstWord = req.params.departmentName.split(" ")[0];

        // Find matching work leader works based on the first word
        const workLeaderMatch = await WorkLeadersWorks.find({
            departmentName: { $regex: `^${firstWord}`, $options: "i" }, // Case-insensitive match with regex
        }).populate({
            path: 'complaintId',
            populate: { path: 'userId', model: 'User' }, // Populate user details from userId
        });

        if (!workLeaderMatch || workLeaderMatch.length === 0) {
            return res.status(404).json({ message: 'No matching work leader works found.' });
        }

        // Extract complaints from work leaders
        const complaints = workLeaderMatch.flatMap((workLeader) => workLeader.complaintId);

        if (!complaints || complaints.length === 0) {
            return res.status(404).json({ message: 'No complaints found in work leader works.' });
        }

        // Fetch matching reports from ReportCreation schema using complaintTitle
        const reports = await ReportCreation.find({
            complaintTitle: { $in: complaints.map((complaint) => complaint.title) }, // Match complaintTitle
        });

        // Combine complaints with their statuses, images, and user details
        const combinedData = complaints.map((complaint) => {
            const matchingReport = reports.find((report) => report.complaintTitle === complaint.title);
            return {
                complaintId: complaint._id,
                complaintTitle: complaint.title || 'Unknown Title',
                complaintDescription: complaint.description || 'No Description Provided',
                complaintPlevel:complaint.pLevel || 'No Level Provided',
                complaintUrl:complaint.url || 'No Location Provided',
                complaintDepartment: matchingReport ? matchingReport.department : 'Unknown',
                complaintStatus: matchingReport ? matchingReport.complaintStatus : 'Unknown', // Default to "Unknown" if no matching report is found
                complaintImages: matchingReport ? matchingReport.complaintImages || [] : [], // Include images if found
                user: complaint.userId
                    ? {
                          userName: complaint.userId.userName || 'Unknown Name',
                          userEmail: complaint.userId.email || 'Unknown Email',
                          userPhone: complaint.userId.phone || 'Unknown Phone',
                          userAddress: complaint.userId.address || 'Unknown Address',
                      }
                    : {}, // Include user details if userId exists
            };
        });

        // Respond with the combined data
        res.status(200).json(combinedData);
    } catch (error) {
        console.error("Error fetching complaints with statuses, images, and user details:", error);
        res.status(500).json({ message: 'Internal server error occurred. Please try again later.' });
    }
});





router.post('/send-email', async (req, res) => {
    const { email, complaintDetails, imageUrls, locationUrl  } = req.body; // email and complaint details from the frontend

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
        auth: {
            user: 'nadunidushera8@gmail.com', // Replace with your email
            pass: 'cvhy uirh gamb qrmi'   // Replace with your email password
        }
    });

    // Email options
    const mailOptions = {
        from: 'nadunidushera8@gmail.com',
        to: email,
        subject: `Complaint Details - ${complaintDetails.title}`,
        html: `
            <h1>${complaintDetails.title}</h1>
            <p><strong>Description:</strong> ${complaintDetails.description}</p>
            <p><strong>Deadline:</strong> ${complaintDetails.endDate}</p>
            <p><strong>Location:</strong> <a href="${locationUrl}" target="_blank">View on map</a></p>
        `,
        attachments: imageUrls.map((url, index) => ({
            filename: `image${index}.jpg`, // Change extension based on the image type
            path: url,
            cid: `image${index}` // Must match the `cid` in the HTML
        }))
    };
    

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email.');
    }
});




module.exports = router;
