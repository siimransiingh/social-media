const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const admin = require('firebase-admin');
const router = express.Router();

const verifyIdToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(' ')[1]; 
  console.log('Received Token:', idToken); // Log the token for debugging

  if (!idToken) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Decoded Token:', decodedToken); // Log the decoded token
    req.user = decodedToken; // Attach the decoded token to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Error verifying token:', err.message); // Log the error
    return res.status(403).json({ message: 'Invalid token', error: err.message });
  }
};

// POST: Create a new post with multiple media
router.post('/', verifyIdToken, async (req, res) => {
  const { userId, mime, caption, media } = req.body;

  console.log("Incoming Request Body:", req.body); // Log the entire incoming body

  if (!userId || !mime || !media || !Array.isArray(media)) {
    console.log("Validation Error: Missing required fields or invalid media format");
    return res.status(400).json({ message: 'userId, mime, and media (array) are required fields' });
  }

  try {
    console.log("Creating new Post...");
    const post = new Post({ mime, caption, media });
    await post.save();
    console.log("Post Created Successfully:", post);

    console.log("Fetching User by ID:", userId);
    const user = await User.findOne({uid:userId});
    if (!user) {
      console.log("User Not Found:", userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("Updating User's Posts Array...");
    user.posts.push(post._id); // Use post._id here, not post.uid
    await user.save();
    console.log("User Updated Successfully:", user);

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    console.error("Error Creating Post:", err.message); // Log the error message
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// GET: Retrieve all posts
router.get('/',verifyIdToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET: Retrieve a single post by ID
router.get('/:id', verifyIdToken,async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PATCH: Update caption of a post
router.patch('/:id', verifyIdToken, async (req, res) => {
  const { id } = req.params;
  const { caption } = req.body;

  if (!caption) {
    return res.status(400).json({ message: 'Caption is required' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.caption = caption; // Update caption
    await post.save();

    res.status(200).json({ message: 'Caption updated successfully', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
