const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    hashedEmail: String,
    otp: Number,
    department: String,
    college: String,
    passoutYear: Number
})

// userSchema.pre('save', async function (next) {
//     try {
//       // Hash email
//       const hashedEmail = await bcrypt.hash(this.email, 10);
//       // Set hashed email
//       this.hashedEmail = hashedEmail;
  
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });

const User = mongoose.model("User", userSchema)

module.exports = User;