// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const ProductModel = require('./api/models/product.model');
const ReviewModel = require('./api/models/reviews.model');
const UserSessionModel = require('./api/models/user.model');

const { dbConnection } = require('./config/sequelize');

// listen to requests

async function startServer() {
	try {
		await dbConnection.authenticate();

		// await ProductModel.sync({ force: true });
		// await ReviewModel.sync({ force: true });
		// await UserSessionModel.sync({ force: true });

		app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
	} catch (e) {
		console.log('🚀 ~ file: index.js ~ line 30 ~ startServer ~ e', e);
	}
}

startServer();
/**
 * Exports express
 * @public
 */
module.exports = app;
