const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, mime, caption } = req.body;
  try {
    const post = new Post({ mime, caption });
    await post.save();

    const user = await User.findById(userId);
    user.posts.push(post._id);
    await user.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
