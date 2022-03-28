const User = require('../models/user');
const Post = require('../models/post');

exports.message_list = (req, res, next) => {
  Post.find()
    .populate('user')
    .exec((err, post_list) => {
      if (err) return next(err);
      console.log('yikesssssssssssssssssssssssss' + req.app.locals.currentUser);
      res.render('messages', {
        post_list,
        user: req.app.locals.currentUser,
      });
    });
};
