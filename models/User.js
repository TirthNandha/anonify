const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    otp: Number,
    department: String,
    college: String,
    passoutYear: Number
})

const User = mongoose.model("User", userSchema)

module.exports = User;