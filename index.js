const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const nodemailer = require('nodemailer');

const allowedDomains = ['vgecg.ac.in'];

// Validate email domain
function validateEmail(email) {
    const [, domain] = email.split('@');
    return allowedDomains.includes(domain);
}

// Send OTP function remains the same as in the previous example
function sendOTP(email) {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Or your email service provider
        host: 'smtp.gmail.com',
        post:587,
        secure:false,
        auth: {
            user: process.env.SENDER_EMAIL, // Your email address
            pass: process.env.SENDER_APP_PASS, // Your email password
        },
    });

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


// Usage
const email = '210170107047@vgecg.ac.in'; // Email to validate
if (validateEmail(email)) {
    sendOTP(email);
} else {
    console.log('Invalid email domain');
}

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT|| 5000, function(req, res) {
    console.log("Server started on post 5000");
})