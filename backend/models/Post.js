const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  mime: { type: String, default: 'text/plain' },
  caption: { type: String, default: '' },
  media: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  userID: { type: String, required: true },
  text: { type: String, default: '' }
});

module.exports = model("Post", postSchema);