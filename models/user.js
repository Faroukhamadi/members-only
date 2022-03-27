const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, minlength: 3, maxlength: 20, required: true },
  password: { type: String, minlength: 5, maxlength: 20, required: true },
  isMember: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
