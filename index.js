const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const nodemailer = require('nodemailer');
var cors = require('cors');

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.DB_URI)

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    otp: Number
})

const User = mongoose.model("LoginCredentials", userSchema)

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

app.post('/check-username', async (req, res) => {
    const { username } = req.body;
    
    try {
      const user = await User.findOne({ username });
      if (user) {
        res.json({ isUnique: false });
      } else {
        res.json({ isUnique: true });
      }
    } catch (error) {
      console.error('Error checking username:', error);
      res.status(500).json({ isUnique: false });
    }
  });

app.get('/', function(re,res) {
    res.send("API home page")
})
app.post('/send-otp', function(req, res) {
    const email = req.body.email;
    sendOTP(email);
    console.log('OTP sent');
})
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (user && user.otp === parseInt(otp, 10)) {
        res.json({ isValid: true });
      } else {
        res.json({ isValid: false });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ isValid: false });
    }
  });
app.listen(process.env.PORT|| 5000, function(req, res) {
    console.log("Server started on post 5000");
})