const httpStatus = require('http-status');

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.submitReview = async (req, res, next) => {
	return res.status(httpStatus[200]).json({
		success: true,
		message: 'success',
		data: {
			value: 'somedata',
		},
	});
};
