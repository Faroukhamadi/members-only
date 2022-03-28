const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// PUT EVERYTHING THE USER CAN ACCESS WHEN HE'S LOGGED IN

/* GET home page. */
router.get('/', user_controller.message_list);

router.get('/create-message', user_controller.create_message_get);
router.post('/create-message', user_controller.create_message_post);

router.get('/become-member', user_controller.become_member_get);
router.post('/become-member', user_controller.become_member_post);

module.exports = router;
