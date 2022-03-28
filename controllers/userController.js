const User = require('../models/user');
const Post = require('../models/post');
const { es } = require('date-fns/locale');

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

exports.create_message_post = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.message,
    Date: new Date(),
    user: req.app.locals.currentUser,
  });

  post.save((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

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
