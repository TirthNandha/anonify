const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors');
const User = require('./models/User');
const { sendOTP } = require('./utils/otp');


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

app.get('/', function (req, res) {
  res.send("API home page")
})
app.post('/send-otp', async function (req, res) {
  const { username, email, type } = req.body;

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
app.post('/verify-otp', async function (req, res) {
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
  try {
    const { username, college, department, passoutYear } = req.body;

    // Update the user document
    const result = await User.updateOne(
      { username },
      {
        $set: {
          college,
          department,
          passoutYear
        },
        $unset: { otp: "" }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'No changes were made' });
    }

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/signin', async (req, res) => {
  const { email } = req.body
  await User.updateOne({ email }, { $unset: { otp: "" } });
  res.status(200).json({ message: 'Signup successful' });
});



app.listen(process.env.PORT || 5000, function (req, res) {
  console.log("Server started on post 5000");
})