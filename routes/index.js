const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/', user_controller.message_list);

router.get('/create-message', user_controller.create_message_get);
router.post('/create-message', user_controller.create_message_post);

router.get('/become-member', user_controller.become_member_get);
router.post('/become-member', user_controller.become_member_post);

router.get('/become-admin', user_controller.become_admin_get);
router.post('/become-admin', user_controller.become_admin_post);

router.post('/delete/:id', user_controller.delete_message_post);

module.exports = router;
