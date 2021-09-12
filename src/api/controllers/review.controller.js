const httpStatus = require('http-status');
const { v4 } = require('uuid');

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.submitReview = async (req, res, next) => {
	// console.log('🚀 ~ file: review.controller.js ~ line 8 ~ exports.submitReview= ~ req', req);

	const token = req.user.token;
	const { ReviewModel, ProductModel } = req.models;
	const { product_id: productId, rating: ratingRaw, review_comment: reviewComment } = req.body;

	const rating = parseFloat(ratingRaw);
	console.log(
		'🚀 ~ file: review.controller.js ~ line 14 ~ exports.submitReview= ~ req.body',
		req.body,
	);

	// ReviewModel

	// FInd the product info rating
	const product = await ProductModel.findOne({ where: { id: productId } });

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
		};
		console.log(
			'🚀 ~ file: review.controller.js ~ line 31 ~ exports.submitReview= ~ objectToBeUpdated',
			objectToBeUpdated,
		);

		const totalRatingParsed = parseFloat(product.totalrating);
		const countReviews = parseFloat(product.count_reviews);

		const ratingForTheIncomingReview = parseFloat(rating);
		if (!foundReviewForThisUser) {
			const insertedReview = await ReviewModel.create(objectToBeUpdated);

			if (product) {
				const newTotalRating = totalRatingParsed + rating;
				const newCountReview = countReviews + 1;

				await product.update({
					totalrating: newTotalRating,
					count_reviews: newCountReview,
				});
			}

			return res.status(httpStatus.OK).json({
				success: true,
				message: 'Successfully posted the review',
			});
		}

		const existingRating = foundReviewForThisUser.rating;
		await foundReviewForThisUser.update(objectToBeUpdated);

		// update the totalrating for products also

		const updatedTotalRating =
			totalRatingParsed - parseFloat(existingRating) + parseFloat(rating);
		console.log(
			'🚀 ~ file: review.controller.js ~ line 75 ~ exports.submitReview= ~ updatedTotalRating',
			updatedTotalRating,
			typeof updatedTotalRating,
		);

		await product.update({
			totalrating: totalRatingParsed - parseFloat(existingRating) + parseFloat(rating),
		});

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
