const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.user_signup_get = (req, res, next) => {
  res.render('signup', { url: req.url });
};

exports.user_signup_post = (req, res, next) => {
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
};

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
