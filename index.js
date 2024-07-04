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
    const { email, type } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (type === 'signup') {
        if (user) {
          res.json({ isUnique: false });
        } else {
          res.json({ isUnique: true });
        }
      } else if (type === 'signin') {
        if (user) {
          res.json({ exists: true });
        } else {
          res.json({ exists: false });
        }
      } else {
        res.status(400).json({ message: 'Invalid type specified' });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/', function(req,res) {
    res.send("API home page")
})
app.post('/send-otp', async function(req, res) {
  const { username, email, type } = req.body;

  // Check for required fields
  if (type === 'signup' && (!email || !username)) {
      return res.status(400).json({ message: 'Username and email are required for signup' });
  } else if (type === 'signin' && !email) {
      return res.status(400).json({ message: 'Email is required for signin' });
  }

  const otp = sendOTP(email);

  try {
      if (type === 'signup') {
          // Check if user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
              return res.status(400).json({ message: 'User already exists with this email' });
          }

          // Create new user for signup
          const newUser = new User({ username, email, otp });
          await newUser.save();
          return res.json({ message: 'OTP sent for signup' });

      } else if (type === 'signin') {
          // Find user by email and update OTP
          const user = await User.findOne({ email });
          if (user) {
              user.otp = otp;
              await user.save();
              return res.json({ message: 'OTP sent for signin' });
          } else {
              return res.status(404).json({ message: 'User not found' });
          }
      } else {
          return res.status(400).json({ message: 'Invalid request type' });
      }
  } catch (error) {
      console.error('Error during OTP process:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/verify-otp', async function(req, res) {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.otp === Number(otp)) {
        res.json({ isValid: true });
      } else {
        res.json({ isValid: false });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ isValid: false });
    }
  });

  app.post('/signup', async (req, res) => {
    const {username} = req.body
    await User.updateOne({ username }, { $unset: { otp: "" } });
        res.status(200).json({ message: 'Signup successful' });
  });
  app.post('/signin', async (req, res) => {
    const {email} = req.body
    await User.updateOne({ email }, { $unset: { otp: "" } });
        res.status(200).json({ message: 'Signup successful' });
  });
  


app.listen(process.env.PORT|| 5000, function(req, res) {
    console.log("Server started on post 5000");
})