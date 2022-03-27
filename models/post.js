const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, minlength: 3, maxlength: 10, required: true },
  content: { type: String, minlength: 10, maxlength: 50, required: true },
  Date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
