const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { formatISO9075 } = require('date-fns');

const PostSchema = new Schema({
  title: { type: String, minlength: 3, maxlength: 100, required: true },
  content: { type: String, minlength: 10, maxlength: 300, required: true },
  Date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

PostSchema.virtual('dateTime').get(() => {
  const fullDate = formatISO9075(new Date());
  return fullDate.substring(0, 10) + ' | ' + fullDate.substring(11, 16);
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;