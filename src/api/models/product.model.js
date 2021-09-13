const { Sequelize, DataTypes } = require('sequelize');
const { getDbInstance } = require('../../config/sequelize');

const dbInstance = getDbInstance();
const Product = {
	modelName: 'Product',
	columns: {
		id: {
			type: DataTypes.STRING(100),
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(1024),
		},
		description: {
			type: DataTypes.STRING(1024),
		},
	},
	options: {
		freezeTableName: true,
		tableName: 'product',
	},
};

const ProductModel = dbInstance.define(Product.modelName, Product.columns, Product.options);

module.exports = ProductModel;
