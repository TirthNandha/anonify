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

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    otp: Number,
})

const User = mongoose.model("LoginCredentials", userSchema)

function sendOTP(email) {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    console.log('The generated OTP is: ', otp);
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
    return otp;
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
      res.status(500).json({ message: 'Internal server error', isUnique: false });
    }
  });

  app.post('/check-email', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.json({ isUnique: false });
      } else {
        res.json({ isUnique: true });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Internal server error', isUnique: false });
    }
  });

app.get('/', function(req,res) {
    res.send("API home page")
})
app.post('/send-otp', async function(req, res) {
    const { username, email } = req.body;
    console.log('Received signup request:', { username, email});
    const otp = sendOTP(email);
    console.log('OTP sent: ', otp);
    if (!username || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
    try {
    //   const user = await User.findOne({ email, otp });
    //   if (user) {
        const newUser = new User({ username, email, otp });
        console.log("newUser is: ", newUser);
        await newUser.save();
        // await User.updateOne({ email }, { $unset: { otp: "" } });
        // res.status(200).json({ message: 'Signup successful' });
        // console.log('signup successfull');
    //   } else {
    //     res.status(400).json({ message: 'Invalid OTP' });
    //     console.log('Invalid OTP');
    //   }
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Error during signup' });
    }
})
app.post('/verify-otp', async function(req, res) {
    const { email, otp } = req.body;
    console.log("the email and otp came for verificaton are: ", email," # ", otp);
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.otp === Number(otp)) {
        res.json({ isValid: true });
        // await User.updateOne({ email }, { $unset: { otp: "" } });
        // res.status(200).json({ message: 'Signup successful' });
        // console.log('signup successfull');
      } else {
        res.json({ isValid: false });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ isValid: false });
    }
  });

  app.post('/signup', async (req, res) => {
    await User.updateOne({ username }, { $unset: { otp: "" } });
        res.status(200).json({ message: 'Signup successful' });
        console.log('signup successfull');
  });
  


app.listen(process.env.PORT|| 5000, function(req, res) {
    console.log("Server started on post 5000");
})