const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  displayPicture: { type: String},
  uid: { type: String}
});

module.exports = model('User', userSchema);
