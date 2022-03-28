const User = require('../models/user');
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

exports.message_list = (req, res, next) => {
  Post.find()
    .populate('user')
    .exec((err, post_list) => {
      if (err) return next(err);
      console.log(req.app.locals.currentUser);
      res.render('messages', {
        post_list,
        user: req.app.locals.currentUser,
      });
    });
};

exports.create_message_get = (req, res, next) => {
  // Don't allow user to access create message page if he's not logged in
  if (req.app.locals.currentUser) {
    res.render('create_message', {
      url: req.url,
    });
  } else {
    res.redirect('/');
  }
};

// exports.create_message_post = (req, res, next) => {
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.message,
//     Date: new Date(),
//     user: req.app.locals.currentUser,
//   });

//   post.save((err) => {
//     if (err) return next(err);
//     res.redirect('/');
//   });
// };

// title: { type: String, minlength: 3, maxlength: 100, required: true },
// content: { type: String, minlength: 10, maxlength: 300, required: true },

exports.create_message_post = [
  // Validate and sanitize fields
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape()
    .withMessage('Title must have a minimum length of 3 characters.'),
  body('content')
    .trim()
    .isLength({ min: 10, max: 300 })
    .escape()
    .withMessage('Content must have a minimum length of 10 characters'),
  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages
      res.render('create_message', {
        message: req.body,
        url: req.url,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid

      // Create category object with escaped and trimmed data
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        Date: new Date(),
        user: req.app.locals.currentUser,
      });
      post.save((err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    }
  },
];

exports.become_member_get = (req, res, next) => {
  if (req.app.locals.currentUser) {
    res.render('become_member', {
      url: req.url,
    });
  } else {
    res.redirect('/');
  }
};

exports.become_member_post = (req, res, next) => {
  if (req.body.memberpassword === process.env.MEMBER_PASSWORD) {
    User.findByIdAndUpdate(
      req.app.locals.currentUser._id,
      { isMember: true },
      (err, results) => {
        if (err) return next(err);
        res.redirect('/');
      }
    );
  }
};

exports.become_admin_get = (req, res, next) => {
  // Some text
  if (req.app.locals.currentUser) {
    res.render('become_admin', {
      url: req.url,
    });
  } else {
    res.redirect('/');
  }
};

exports.become_admin_post = (req, res, next) => {
  if (req.body.adminpassword === process.env.ADMIN_PASSWORD) {
    User.findByIdAndUpdate(
      req.app.locals.currentUser._id,
      { isAdmin: true },
      (err, results) => {
        if (err) return next(err);
        res.redirect('/');
      }
    );
  }
};

exports.delete_message_get = (req, res, next) => {
  console.log('hello1');
  res.render('delete_message', {
    url: req.url,
  });
};

exports.delete_message_post = (req, res, next) => {
  console.log('hello2');
  Post.findByIdAndRemove(req.params.id, (err, post) => {
    console.log(`------------------------
    HERE --------------------`);
    if (err) return next(err);
    console.log('Post successfully deleted');
    res.redirect('/');
  });
};
