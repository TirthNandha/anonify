const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors');
const User = require('./models/User');
const { sendOTP } = require('./utils/otp');
const Post = require('./models/Post');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { createServer } = require('http');


const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  process.env.REACT_APP_API_URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 }
}));

mongoose.connect(process.env.DB_URI)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




app.post('/api/check-username', async (req, res) => {
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

app.post('/api/check-email', async (req, res) => {
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

app.post('/api/send-otp', async function (req, res) {
  const { username, email, type } = req.body;

  const otp = sendOTP(email);

  try {
    if (type === 'signup') {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const newUser = new User({ username, email, otp });
      await newUser.save();
      return res.json({ message: 'OTP sent for signup' });

    } else if (type === 'signin') {

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
app.post('/api/verify-otp', async function (req, res) {
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

app.post('/api/signup', async (req, res) => {
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
      },
      { new: true } // This option returns the updated document
    );

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Set session
    req.session.userId = result._id;

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        message: 'No changes were made', token,
        user: {
          id: result._id,
          username: result.username
        },
        username: result.username
      });
    }

    res.status(200).json({
      message: 'Signup completed successfully',
      token,
      user: {
        id: result._id,
        username: result.username
      },
      username: result.username
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

app.get('/api/validate-token', async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        // college: user.college,
        // department: user.department,
        // passoutYear: user.passoutYear
      }
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});



app.post('/api/signin', async (req, res) => {
  try {
    const { email } = req.body
    await User.updateOne({ email }, { $unset: { otp: "" } });
    const updatedUser = await User.findOne({ email });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: updatedUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Set session
    req.session.userId = updatedUser._id;

    res.status(200).json({
      message: 'Signin successful',
      token,
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email
      },
      username: updatedUser.username
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/getDetails', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.json({ college: user.college, department: user.department, passoutYear: user.passoutYear, username: user.username });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/newpost', async function (req, res) {
  const { title, content, category, username, college, department, passoutYear } = req.body;
  const likes = 0;
  const comments = [];
  let commentsCount = comments.length;
  const newPost = new Post({ title, content, category, username, college, department, passoutYear, comments, commentsCount, likes });
  await newPost.save();
  console.log("new Post added.");
  return res.json({ message: 'New Post added.' });

});

app.get('/api/posts/:type', async function (req, res) {
  try {
    const { type } = req.params;
    if (type === 'home') {
      const foundPosts = await Post.find({}).lean();
      res.json(foundPosts);
    } else {
      const foundPosts = await Post.find({ category: type }).lean();
      res.json(foundPosts);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});


app.post('/api/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const { username } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (post.likedBy.includes(username)) {
      post.likedBy.pull(username);
      post.likes -= 1;
    } else {
      post.likedBy.push(username);
      post.likes += 1;
    }

    await post.save();

    res.json({ success: true, likeCount: post.likes, isLiked: post.likedBy.includes(username) });
  } catch (error) {
    console.error('Error toggling like status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
app.get('/api/posts/:postId/like-status', async (req, res) => {
  const { postId } = req.params;
  const { username } = req.query;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const isLiked = post.likedBy.includes(username);
    res.json({ success: true, isLiked });
  } catch (error) {
    console.error('Error fetching like status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/post/:postId', async function (req, res) {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'An error occurred while fetching post' });
  }
});

app.get('/api/post/:postId/comments', async function (req, res) {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const comments = post.comments;
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'An error occurred while fetching comments' });
  }
});

app.post("/api/post/:postId/add-comment", async function (req, res) {
  const { postId } = req.params;
  const { content, username, passoutYear, department, college } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const newComment = {
      content,
      username,
      passoutYear,
      department,
      college
    };

    post.comments.push(newComment);
    post.commentsCount += 1;

    await post.save();

    res.json({ success: true, message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const posts = await Post.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { content: { $regex: searchTerm, $options: 'i' } }
      ]
    })
    .limit(10)
    .select('title content');

    const formattedResults = posts.map(post => ({
      id: post._id,
      title: post.title,
      content: post.content.substring(0, 100) + '...'
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error performing search' });
  }
});

const server = createServer(app);

module.exports = (req, res) => {
  server.emit('request', req, res);
};

if (require.main === module) {
  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    console.log(`Local server running on http://localhost:${port}`);
  });
}
