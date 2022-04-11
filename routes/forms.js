const express = require('express');
const post_controller = require('../controllers/postController');
const router = express.Router();

router.get('/', (req, res) => res.redirect('/'));

router.get('/login', post_controller.user_login_get);
router.post('/login', post_controller.user_login_post);

router.get('/signup', post_controller.user_signup_get);
router.post('/signup', post_controller.user_signup_post);

router.get('/logout', post_controller.user_logout);

module.exports = router;
