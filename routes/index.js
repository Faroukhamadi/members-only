const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// PUT EVERYTHING THE USER CAN ACCESS WHEN HE'S LOGGED IN

/* GET home page. */
router.get('/', user_controller.message_list);

module.exports = router;
