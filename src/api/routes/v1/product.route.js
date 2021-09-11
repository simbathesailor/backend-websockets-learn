const express = require('express');
const controller = require('../../controllers/product.controller');

const router = express.Router();

router.route('/info').get(controller.getProducts);

router.route('/review').get(controller.getProductReview);

module.exports = router;
