const httpStatus = require('http-status');

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.getProducts = async (req, res, next) => {
	return res.status(httpStatus.OK).json({
		success: true,
		message: 'success',
		data: {
			value: 'somedata',
		},
	});
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
