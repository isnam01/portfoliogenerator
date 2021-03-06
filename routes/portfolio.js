const express = require('express');
const router = express.Router();
const portfolio = require('../controller/portfolio');
const { authenticateLogin } = require('../middleware/authenticateLogin');

router.route('/portfolio')
    .put(authenticateLogin, portfolio.editportfolio)
    .get(authenticateLogin, portfolio.getportfolio)


router.route('/portfolio/:url')
    .get(portfolio.allportfolio)

router.route('/updateurl')
    .post(authenticateLogin, portfolio.updateurl)
    .get(authenticateLogin, portfolio.geturl)

router.route('/contact/:url')
    .get(portfolio.contact)

module.exports = router;