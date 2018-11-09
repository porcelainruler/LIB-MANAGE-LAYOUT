var Sequelize = require('sequelize');

var sequelize = new Sequelize('LibraryManagementSystem', 'root', 'Shaj9650@',
    {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
        /*config.database,
        config.username,
        config.password,
        config*/
	});
	
	var User = sequelize.define(
		"User",
		{
			username: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					len: [6, 14],
				}
			},
			
		},

		{
			timestamps: false
		}
	);

	require("./js/parentOrderAssociation.js")(User);

	sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = User