#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const User = require('./models/user');
const Post = require('./models/post');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];
const posts = [];

function userCreate(username, password, cb) {
  userDetail = { username: username, password: password };
  const user = new User(userDetail);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New user: ' + user);
    users.push(user);
    cb(null, user);
  });
}

function postCreate(title, content, Date, user, cb) {
  const post = new Post({
    title: title,
    content: content,
    Date: Date,
    user: user,
  });

  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New post: ' + post);
    posts.push(post);
    cb(null, post);
  });
}

function createProductsCategories(cb) {
  async.series(
    [
      function (callback) {
        userCreate('faroukhamadi', 'passwordfarouk', callback);
      },
      function (callback) {
        userCreate('hayetmejri', 'passwordhayet', callback);
      },
      function (callback) {
        userCreate('mihyarhamadi', 'passwordmihyar', callback);
      },
      function (callback) {
        userCreate('nardinehamadi', 'passwordnardine', callback);
      },
      function (callback) {
        userCreate('aoushamadi', 'passwordaous', callback);
      },

      function (callback) {
        postCreate(
          'The Cheesecake Factory: Use humor and great photos',
          'This is an American chain of restaurants, localized around the world. If you’re not familiar with it.',
          new Date(),
          users[0],
          callback
        );
      },
      function (callback) {
        postCreate(
          'Google: Share interesting customer stories',
          "Google Maps is one of those things that doesn't need much explaining. Most people know what it does, it helps you get from A to B.",
          new Date(),
          users[1],
          callback
        );
      },
      function (callback) {
        postCreate(
          "Tony's Chocolate lonely: Show people what's happening",
          'Includes amazing features with fast charging capabilities that are amazingly crafted by our apple hard-working employees',
          new Date(),
          users[2],
          callback
        );
      },
      function (callback) {
        postCreate(
          'The Clay Creative Co: Increase followers with giveaways',
          "Now, this is an online store you've probably not heard of, as it’s a small business from the UK that sells its earrings through Etsy.",
          new Date(),
          users[3],
          callback
        );
      },
      function (callback) {
        postCreate(
          'Social Media Examiner: Share your expertise',
          "Social Media Examiner is a media company that's based in the United States. It publishes online magazines.",
          new Date(),
          users[4],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createProductsCategories],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('posts: ' + posts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
