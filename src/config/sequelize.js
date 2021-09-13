/* eslint-disable import/no-mutable-exports */
const Sequelize = require('sequelize');
// import User from 'User/user.model'

async function TestDbConnection(sequelizeInstance) {
	try {
		const val = await sequelizeInstance.authenticate();
		console.log('Connection has been established successfully.', val);
		return val;
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

let dbInstance;

function getDatabaseConnection(callback) {
	if (!dbInstance) {
		console.log(
			'🚀 ~ file: sequelize.js ~ line 21 ~ getDatabaseConnection ~ process.env.DATABASE_URL',
			process.env.DATABASE_URL,
		);
		dbInstance = new Sequelize(process.env.DATABASE_URL, {
			ssl: true,
			dialectOptions: {
				ssl: true,
			},
			logging: (...msg) => {
				console.log('Database query :\n', msg);
			},
			define: {
				underscored: true,
				freezeTableName: true,
				timestamps: true,
			},
		});
	}

	// add a condtion to alter only when it is non production
	// I dont know what should be the good pattern here,
	// If made changes to tables in production separtely by running scripts ?
	// I am not sure if its a good idea. I can park this thing now and can check back later.

	// await TestDbConnection(dbInstance)

	// console.log('goona sync the tables')
	// await dbInstance.sync({ alter: true })

	if (callback) {
		callback(dbInstance);
	}

	return dbInstance;
}

function getDbInstance() {
	return dbInstance;
}

module.exports = {
	dbConnection: getDatabaseConnection(),
	getDbInstance,
};
