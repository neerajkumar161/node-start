const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostModel = new Schema({
  description: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('post', PostModel); // posts
