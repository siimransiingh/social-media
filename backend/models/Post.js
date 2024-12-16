import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  mime: { type: String, required: true },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model('Post', postSchema);
