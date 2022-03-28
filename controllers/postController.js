const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.user_signup_get = (req, res, next) => {
  res.render('signup', { url: req.url });
};
exports.user_signup_post = [
  // Validate and sanitize fields
  body('username')
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape()
    .withMessage('Username must have a minimum length of 3 characters.')
    .isAlphanumeric()
    .withMessage('Username has non alphanumeric characters.'),
  body('confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password.');
    }
  }),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages
      res.render('signup', {
        url: req.url,
        post: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid

      // Create category object with escaped and trimmed data
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        }).save((err) => {
          if (err) return next(err);
          res.redirect('/forms/login');
        });
      });
    }
  },
];

exports.user_login_get = (req, res, next) => {
  res.render('login', {
    url: req.url,
  });
};

exports.user_login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

exports.user_logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
