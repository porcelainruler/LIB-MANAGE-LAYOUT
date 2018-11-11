var Sequelize = require('sequelize');
var Dish = require('../models/dishes');

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
			userid: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
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
			dishes: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue : ""
				
			}
			
		},

		{
			timestamps: false
		},
		
	);

	User.associate = (models) => {
		User.belongsTo(models.Dish, {
			foreignKey: "dishid"
		});
	  };



	sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = User;