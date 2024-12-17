// backend/routes/userRoutes.js

const express = require('express');
const User = require('../models/User');
const admin = require('firebase-admin');
const router = express.Router();
const serviceAccount = require('../social-media-984db-firebase-adminsdk-9ibc3-1fcd4185ea.json')
// Initialize Firebase Admin
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });


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


// Create user route
router.post('/', async (req, res) => {
  const { firstName, lastName, email, bio, displayPicture, uid } = req.body;
  try {
    const user = new User({ firstName, lastName, email, bio, displayPicture, uid });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user route (protected)
router.get('/:uid', verifyIdToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).populate('posts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
