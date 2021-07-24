const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('user', UserModel); // users
