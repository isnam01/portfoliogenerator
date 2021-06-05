const express = require('express');
const router = express.Router();
const users = require('../controller/auth');
const { route } = require('./portfolio');
// const { isLoggedIn } = require('../middleware')
// const { isAdmin } = require('../middleware')

router.route('/signin')
    .post(users.postlogin)


router.route('/signup')
    .post(users.postregister)

router.route('./resetpassword')
    .post(users.resetpassword)

router.route('./newpassword')
    .post(users.newpassword)

module.exports = router;