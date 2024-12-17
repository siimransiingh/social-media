const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const postSchema = new Schema({
  mime: { type: String, required: true },
  caption: { type: String },
  media: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  postID: { type: String, default: uuidv4 },
});

module.exports = model("Post", postSchema);
