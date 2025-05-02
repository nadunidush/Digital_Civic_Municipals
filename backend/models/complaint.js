const mongoose = require("mongoose"); 

//Complaint Schema
const compliantSchema = new mongoose.Schema({
    title:String,
    description:String,
    url:String,
    pLevel:String,
    files: [
        { url: String, id: String },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    status: { type: String, default: 'new' }
});


const Complaint = mongoose.model("Complaint", compliantSchema);

module.exports = Complaint;