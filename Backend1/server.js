const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Create Express app
const app = express();
const port = 3030;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb+srv://admin:talhashahid@talhacluster.4cj4xvt.mongodb.net/procodersDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose Schemas and Models
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  youtubeLink: String,
  code: String,
  status: String,
  category:String,
  thumbnail: String // URL to the thumbnail image
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return candidatePassword==this.password;
};

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes for User
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    res.status(200).send({ username: user.username });
  } catch (error) {
    res.status(500).send(error);
  }
});


app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Routes for Post
app.post('/posts', upload.single('thumbnail'), async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      thumbnail: req.file ? `/uploads/${req.file.filename}` : null
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to toggle post status
app.put('/posts/:id/toggle-status', async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) return res.status(404).send({ message: 'Post not found' });
  
      // Toggle the status
      post.status = post.status === 'Show' ? 'Hide' : 'Show';
      
      await post.save();
      res.status(200).send({ message: `Post status toggled to ${post.status}` });
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

app.put('/posts/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send();
    
    if (req.file) {
      post.thumbnail = `/uploads/${req.file.filename}`;
    }

    Object.assign(post, req.body);
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
