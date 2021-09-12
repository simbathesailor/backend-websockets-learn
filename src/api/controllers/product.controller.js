const httpStatus = require('http-status');

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.getProducts = async (req, res, next) => {
	console.log(
		'🚀 ~ file: product.controller.js ~ line 8 ~ exports.getProducts= ~ req',
		req.models,
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
