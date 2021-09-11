const express = require('express');
const controller = require('../../controllers/review.controller');

const router = express.Router();

router.route('/submit').post(controller.submitReview);
router.route('/submit').patch(controller.submitReview);

module.exports = router;
