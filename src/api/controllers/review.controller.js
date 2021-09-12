const httpStatus = require('http-status');
const { v4 } = require('uuid');

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.submitReview = async (req, res, next) => {
	// console.log('🚀 ~ file: review.controller.js ~ line 8 ~ exports.submitReview= ~ req', req);

	const token = req.user.token;
	const { ReviewModel } = req.models;
	const { product_id: productId, rating, review_comment: reviewComment } = req.body;

	// ReviewModel

	try {
		const foundReviewForThisUser = await ReviewModel.findOne({
			where: {
				user_id: token,
			},
		});

		const objectToBeUpdated = {
			product_id: productId,
			id: v4(),
			rating,
			comment: reviewComment,
			user_id: token,
		};
		if (!foundReviewForThisUser) {
			const insertedReview = await ReviewModel.create(objectToBeUpdated);

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
		console.log('🚀 ~ file: review.controller.js ~ line 48 ~ exports.submitReview= ~ e', e);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Failed to save the reviews',
		});
	}
};
