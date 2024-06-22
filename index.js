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

const anonifySchema = new mongoose.Schema({
    username: String,
    email: String
})

const LoginCredentials = mongoose.model("LoginCredentials", anonifySchema)

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

app.post('/Signup', async function(req, res) {
    const newID = new LoginCredentials({
        title : req.body.title,
        content : req.body.content
    })
})

app.get('/', function(re,res) {
    res.send("API home page")
})
app.post('/send-otp', function(req, res) {
    const email = req.body.email;
    sendOTP(email);
    console.log('OTP sent');
})





app.listen(process.env.PORT|| 5000, function(req, res) {
    console.log("Server started on post 5000");
})