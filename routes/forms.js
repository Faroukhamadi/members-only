const express = require('express');
const post_controller = require('../controllers/postController');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res) => res.redirect('/'));

router.get('/login', post_controller.user_login_get);
router.post('/login', post_controller.user_login_post);

router.get('/signup', post_controller.user_signup_get);
router.post('/signup', post_controller.user_signup_post);

module.exports = router;
