const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { dbConnection } = require('../../config/sequelize');
const { QUERY_GET_ALLPRODUCTS } = require('../query');

/**
 * Returns jwt token if registration was successful
 * @public
 */

async function getallReviewForProduct({ productId, ReviewModel }) {
	const result = await ReviewModel.findAll({
		where: {
			product_id: {
				[Op.eq]: productId,
			},
		},
	});

	return result;
}
exports.getProducts = async (req, res, next) => {
	// console.log(
	// 	'🚀 ~ file: product.controller.js ~ line 8 ~ exports.getProducts= ~ req',
	// 	req.models,
	// );

	const { ReviewModel } = req.models;

	try {
		const [results, metaData] = await dbConnection.query(QUERY_GET_ALLPRODUCTS);

		const resultsToBeSent = (results || [])?.map(each => {
			return {
				...each,
				total_rating: parseFloat(each.total_rating || 0),
			};
		});

		// eslint-disable-next-line
		for (const result of resultsToBeSent) {
			// eslint-disable-next-line
			const reviews = await getallReviewForProduct({
				productId: result.id,
				ReviewModel,
			});
			result.reviews = reviews;
		}

		return res.status(httpStatus.OK).json({
			success: true,
			message: 'Succesfully fetched the product',
			data: {
				products: resultsToBeSent, // products,
			},
		});
	} catch (e) {
		console.log('🚀 ~ file: product.controller.js ~ line 58 ~ exports.getProducts= ~ e', e);
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Looks like something broke !!',
		});
	}
};

exports.getProductInfo = async (req, res, next) => {
	console.log(
		'🚀 ~ file: product.controller.js ~ line 8 ~ exports.getProducts= ~ req',
		req.params,
	);

	const { ProductModel } = req.models;

	try {
		const products = await ProductModel.findAll();

		return res.status(httpStatus.OK).json({
			success: true,
			message: 'Succesfully fetched the product',
			data: {
				products,
			},
		});
	} catch (e) {
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Looks like something broke !!',
		});
	}

	// return res.status(httpStatus.OK).json({
	// 	success: true,
	// 	message: 'success',
	// 	data: {
	// 		value: 'somedata',
	// 	},
	// });
};

exports.getProductReview = async (req, res, next) => {
	return res.status(httpStatus.OK).json({
		success: true,
		message: 'success',
		data: {
			value: 'somedata',
		},
	});
};
