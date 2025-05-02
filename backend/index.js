const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const createComplaint = require('./routes/createComplaint');
const adminGetComplaints = require('./routes/admin_get_complaints');
const addComplaintDepartment = require('./routes/add_complaints_departmets');
const LoginRoute = require('./routes/login_route');
const SignupRoute = require('./routes/signup_route');
const WorkLeadersWorks = require('./routes/work_leaders_work_route');
const AdminDepartmentRoute = require('./routes/admin_department_route');
const ReportCreationAuth = require('./routes/report_creation_auth');
const CompletionComplaint = require('./routes/completion_complaint_route');
const countDepartmentRoute = require('./routes/count_department_route');
const ReportCreationRoute = require('./routes/reportcreation_count_route');
const GetComplaintsCitizen = require('./routes/get_complaints_citizen');
const GetCompletionComplaints = require('./routes/get_completion_complaints');
const SubmitFeedback = require('./routes/submit_feedbacks_routes');
const GetNotifictions = require('./routes/get_notification_route');
const GetFeedbacks = require('./routes/get_feedbacks_route');
const WokerRoute = require('./routes/woker_route');
const GetAllReportsLeaders = require('./routes/get_all_report_leaders_route');
const cloudinary = require("./config/cloudinary");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

//DB
connectDB();

//routes
app.use("/", authRoutes);
app.use("/", createComplaint);
app.use("/", adminGetComplaints);
app.use("/", addComplaintDepartment);
app.use("/", LoginRoute);
app.use("/", SignupRoute);
app.use("/", WorkLeadersWorks);
app.use("/", ReportCreationAuth);
app.use("/", AdminDepartmentRoute);
app.use("/", CompletionComplaint);
app.use("/", countDepartmentRoute);
app.use("/", ReportCreationRoute);
app.use("/", GetComplaintsCitizen);
app.use("/", GetCompletionComplaints);
app.use("/", SubmitFeedback);
app.use("/", GetNotifictions);
app.use("/", GetFeedbacks);
app.use("/", WokerRoute);
app.use("/", GetAllReportsLeaders);


app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});