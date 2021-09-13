const { Sequelize, DataTypes } = require('sequelize');
const { getDbInstance } = require('../../config/sequelize');

const dbInstance = getDbInstance();

const UserSession = {
	modelName: 'UserSession',
	columns: {
		id: {
			type: DataTypes.STRING(100),
			primaryKey: true,
		},
		ip_address: {
			type: DataTypes.STRING(100),
		},
	},
	options: {
		freezeTableName: true,
		tableName: 'user_session',
	},
};

const UserSessionModel = dbInstance.define(
	UserSession.modelName,
	UserSession.columns,
	UserSession.options,
);

module.exports = UserSessionModel;
