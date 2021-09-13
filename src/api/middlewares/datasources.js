const { ProductModel, ReviewModel, UserSessionModel } = require('../models');

function addDatasources() {
	return (req, res, next) => {
		// console.log('🚀 ~ file: datasources.js ~ line 5 ~ return ~ req', req);
		req.models = { ProductModel, ReviewModel, UserSessionModel };
		next();
	};
}

exports.addDatasources = addDatasources;
