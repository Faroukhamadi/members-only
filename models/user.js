const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, minlength: 3, maxlength: 100, required: true },
  password: { type: String, minlength: 5, maxlength: 300, required: true },
  isMember: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
