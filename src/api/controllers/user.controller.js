const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

/**
 * This is just the placeholder for login functionality
 * It just gives back a jwt signed token  that is used to identify different user
 *
 * @public
 */
exports.login = async (req, res, next) => {
	const string = jwt.sign(
		{
			data: {
				ipaddress: 'sdds',
			},
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '180 days',
		},
	);
	// console.log('🚀 ~ file: user.controller.js ~ line 19 ~ exports.login= ~ string', req.wss);
	return res.status(httpStatus.OK).json({
		success: true,
		message: 'success',
		data: {
			token: string,
		},
	});
};

exports.logout = async (req, res, next) => {
	return res.status(httpStatus.OK).json({
		success: true,
		message: 'success',
		data: {
			value: 'somedata',
		},
	});
};
