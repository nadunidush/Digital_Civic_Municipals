const mongoose = require("mongoose");

//User schema
const userSchema = new mongoose.Schema({
    userName:String,
    email:String,
    phoneNumber:String,
    address:String,
    password:String,
    image: [
        { url: String, id: String },
    ],
});




const User = mongoose.model("User",userSchema);

module.exports = User;