const express = require('express');
const controller = require('../../controllers/product.controller');

const router = express.Router();

router.route('/all').get(controller.getProducts);

router.route('/info/:productId').get(controller.getProductInfo);

router.route('/review').get(controller.getProductReview);

module.exports = router;
