const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const { authenticateLogin } = require('../middleware/authenticateLogin');

router.route('/updateuser')
    .post(authenticateLogin, user.updateuser)

router.route('/user')
    .delete(authenticateLogin, user.deleteuser)

module.exports = router;
