const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
});

const Worker = mongoose.model("Worker", WorkerSchema);
module.exports = Worker;
