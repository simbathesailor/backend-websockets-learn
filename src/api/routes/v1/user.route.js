const express = require('express');
const controller = require('../../controllers/user.controller');

const router = express.Router();

router.route('/login').post(controller.login);

router.route('/logout').get(controller.logout);

module.exports = router;
