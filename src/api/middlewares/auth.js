const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

/**
 * The list of public urls. The check can be more efficient
 *
 * @var {[type]}
 */
const PUBLIC_URLS = ['/v1/users/login'];

function getAuthMiddleware() {
	return (req, res, next) => {
		// req.wss = wss;

		const isPublicURL = PUBLIC_URLS.indexOf(req.url) !== -1;

		if (isPublicURL) {
			return next();
		}

		// console.log('Adding websoket server to context');
		try {
			const decoded = jwt.verify(req.get('token'), process.env.JWT_SECRET);
			req.user = {
				token: req.get('token'),
				decoded,
			};

			return next();
		} catch (e) {
			return res.status(httpStatus.UNAUTHORIZED).json({
				success: false,
				message: 'Token is invalid',
			});
		}
	};
}

exports.getAuthMiddleware = getAuthMiddleware;
