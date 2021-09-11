// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const ProductModel = require('./api/models/product.model');
const ReviewModel = require('./api/models/reviews.model');

//const mongoose = require('./config/mongoose');

const { dbConnection } = require('./config/sequelize');

// open mongoose connection

// mongoose.connect();

// listen to requests

async function startServer() {
	await dbConnection.authenticate();

	//await ProductModel.sync({ force: true });
	await ReviewModel.sync({ force: true });
	app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
}

startServer();
/**
 * Exports express
 * @public
 */
module.exports = app;
