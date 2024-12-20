const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const admin = require('firebase-admin');
const router = express.Router();

const verifyIdToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(' ')[1]; 


  if (!idToken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.user = decodedToken; // Attach the decoded token to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
  
    return res.status(403).json({ message: 'Invalid token', error: err.message });
  }
};

// POST: Create a new post with multiple media
router.post('/', verifyIdToken, async (req, res) => {
  console.log('Received request body:', req.body); // Add this log

  const { userId, mime, caption, media, text } = req.body;

  // Validate required fields
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    // Find user first
    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create post
    const post = new Post({ 
      userID: userId,
      mime: mime || 'text/plain', // Default mime type
      caption: caption || '',
      media: Array.isArray(media) ? media : [],
      text: text || ''
    });
    
    console.log('Attempting to save post:', post); // Add this log
    const savedPost = await post.save();
    console.log('Post saved successfully:', savedPost); // Add this log

    // Update user's posts array
    user.posts.push(savedPost._id);
    await user.save();

    res.status(201).json({ 
      message: 'Post created successfully', 
      post: savedPost 
    });
  } catch (err) {
    console.error('Server error:', err); // Add detailed error logging
    res.status(500).json({ 
      message: 'Server error', 
      error: err.message,
      details: err.stack 
    });
  }
});


// GET: Retrieve all posts
router.get('/', verifyIdToken,async (req, res) => {
  try {
    // Using MongoDB aggregation to join posts with users
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'users', // The collection name is lowercase 'users'
          let: { userId: '$userID' }, // The field from posts
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$uid', '$$userId'] // Matching uid from users with userID from posts
                }
              }
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                displayPicture: 1,
                email: 1,
                bio: 1
              }
            }
          ],
          as: 'user'
        }
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] } // Convert user array to object
        }
      },
      {
        $sort: { createdAt: -1 } // Sort by newest first
      }
    ]);

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
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
