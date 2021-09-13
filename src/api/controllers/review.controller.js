const httpStatus = require('http-status');
const { Op, QueryTypes } = require('sequelize');
const { v4 } = require('uuid');
const { dbConnection } = require('../../config/sequelize');
const { UPDATE_PRODUCT_REVIEW } = require('../services/websocket/const');
const { broadcast } = require('../services/websocket');

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.submitReview = async (req, res, next) => {
	// console.log('🚀 ~ file: review.controller.js ~ line 8 ~ exports.submitReview= ~ req', req);

	const token = req.user.token;
	const { ReviewModel, ProductModel } = req.models;
	const { product_id: productId, rating: ratingRaw, review_comment: reviewComment } = req.body;

	try {
		const foundReviewForThisUser = await ReviewModel.findOne({
			where: {
				user_id: token,
				product_id: productId,
			},
		});

		const objectToBeUpdated = {
			product_id: productId,
			id: v4(),
			rating: ratingRaw,
			comment: reviewComment,
			user_id: token,
			// updated_at: new Date().toISOString(),
		};

		if (!foundReviewForThisUser) {
			await ReviewModel.create(objectToBeUpdated);

			return res.status(httpStatus.OK).json({
				success: true,
				message: 'Successfully posted the review',
			});
		}

		await foundReviewForThisUser.update(objectToBeUpdated);

		return res.status(httpStatus.OK).json({
			success: true,
			message: 'Successfully updated the review',
		});
	} catch (e) {
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Failed to save the reviews',
		});
	}
};
