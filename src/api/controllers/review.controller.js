const httpStatus = require('http-status');
const { Op, QueryTypes } = require('sequelize');
const { v4 } = require('uuid');
const { dbConnection } = require('../../config/sequelize');

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.submitReview = async (req, res, next) => {
	// console.log('🚀 ~ file: review.controller.js ~ line 8 ~ exports.submitReview= ~ req', req);

	const token = req.user.token;
	const { ReviewModel, ProductModel } = req.models;
	const { product_id: productId, rating: ratingRaw, review_comment: reviewComment } = req.body;

	console.log(
		'🚀 ~ file: review.controller.js ~ line 14 ~ exports.submitReview= ~ req.rating',
		typeof ratingRaw,
	);

	// ReviewModel

	// // FInd the product info rating
	// const product = await ProductModel.findOne({ where: { id: productId } });

	try {
		const foundReviewForThisUser = await ReviewModel.findOne({
			where: {
				user_id: token,
				product_id: productId,
			},
		});
		// console.log(
		// 	'🚀 ~ file: review.controller.js ~ line 36 ~ exports.submitReview= ~ foundReviewForThisUser',
		// 	foundReviewForThisUser,
		// );

		const objectToBeUpdated = {
			product_id: productId,
			id: v4(),
			rating: ratingRaw,
			comment: reviewComment,
			user_id: token,
			// updated_at: new Date().toISOString(),
		};

		console.log(
			'🚀 ~ file: review.controller.js ~ line 31 ~ exports.submitReview= ~ objectToBeUpdated',
			objectToBeUpdated,
		);

		if (!foundReviewForThisUser) {
			debugger;
			// objectToBeUpdated.created_at = new Date().toISOString();

			// const insertedReview = await dbConnection.query(
			// 	` INSERT INTO public.review (id,rating,comment,user_id,product_id,created_at,updated_at) VALUES
			// 	(  $id,
			// 		 $rating,
			// 		 $comment,
			// 		 $user_id,
			// 		 $product_id,
			// 		 $created_at,
			// 		 $updated_at
			// 	)

			// 	`,
			// 	{
			// 		bind: objectToBeUpdated,
			// 		type: QueryTypes.INSERT,
			// 	},
			// );
			// console.log(
			// 	'🚀 ~ file: review.controller.js ~ line 74 ~ exports.submitReview= ~ insertedReview',
			// 	insertedReview,
			// );
			const insertedReview = await ReviewModel.create(objectToBeUpdated);

			return res.status(httpStatus.OK).json({
				success: true,
				message: 'Successfully posted the review',
			});
		}

		await foundReviewForThisUser.update(objectToBeUpdated);

		// update the totalrating for products also

		// console.log(
		// 	'🚀 ~ file: review.controller.js ~ line 75 ~ exports.submitReview= ~ updatedTotalRating',
		// 	updatedTotalRating,
		// 	typeof updatedTotalRating,
		// );

		debugger;
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
