const express = require("express");
const User = require("../models/User");
const admin = require("firebase-admin");
const router = express.Router();
const serviceAccount = require("/etc/secrets/firebase-admin.json");


// Initialize Firebase Admin
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const verifyIdToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(" ")[1];

  if (!idToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.user = decodedToken; // Attach the decoded token to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid token", error: err.message });
  }
};

// Create user route
router.post("/", async (req, res) => {
  const { firstName, lastName, email, bio, displayPicture, uid } = req.body;
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      bio,
      displayPicture,
      uid,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user route
router.get("/:uid", verifyIdToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).populate("posts");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// edit user detail
router.patch("/:uid", verifyIdToken, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 const { firstName, backgroundPicture, bio, displayPicture } = req.body;

    // Update fields if provided
    if (firstName) user.firstName = firstName;
    if (bio) user.bio = bio;
    if (displayPicture) user.displayPicture = displayPicture;
    if (backgroundPicture) user.backgroundPicture = backgroundPicture;

    // Save updated user
    await user.save();

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
