const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, email, bio } = req.body;
  try {
    const user = new User({ firstName, lastName, email, bio });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('posts');
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
