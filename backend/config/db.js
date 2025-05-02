const mongoose = require("mongoose");
require('dotenv').config();

const URL = process.env.MONGO_URL
const connectDB = async()=>{
    try {
        await mongoose.connect(URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error",error.message); 
        process.exit(1);
    }
}

module.exports = connectDB;
