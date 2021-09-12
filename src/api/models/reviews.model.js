const { Sequelize, DataTypes } = require('sequelize');
const { getDbInstance } = require('../../config/sequelize');

const dbInstance = getDbInstance();
const Review = {
	modelName: 'Review',
	columns: {
		id: {
			type: DataTypes.STRING(200),
			primaryKey: true,
		},
		rating: {
			type: DataTypes.ENUM,
			values: ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
		},
		comment: {
			type: DataTypes.STRING(1024),
		},
		user_id: {
			type: DataTypes.STRING(1024),
		},
		product_id: {
			type: DataTypes.STRING(1024),
		},
	},
	options: {
		freezeTableName: true,
		tableName: 'review',
	},
};

const ReviewModel = dbInstance.define(Review.modelName, Review.columns, Review.options);

module.exports = ReviewModel;
