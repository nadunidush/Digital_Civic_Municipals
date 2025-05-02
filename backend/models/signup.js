const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    role: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });


const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;