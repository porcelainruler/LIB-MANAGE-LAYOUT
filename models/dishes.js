var Sequelize = require('sequelize');
var User = require("../models/user");

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

	var Dish = sequelize.define(
		"Dish",
		{
			dishid: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: true,
				defaultValue: null
			},

			image: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "./images/buffet.png"
			},

			category: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'appetizer'
			},

			price: {
				type: Sequelize.STRING,
				allowedNull: true
			},		

			description: {
				type: Sequelize.TEXT,
				allowNull: true,
				defaultValue: null
			}
		},

		{
			timestamps: false
		}
	);

	Dish.associate = (models) => {
		Dish.hasMany(models.User, {
			foreignKey: "dishid",
			as: "dishes",
		});
	  };


	sequelize.sync()
    .then(() => console.log('Dish table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));



	module.exports = Dish;

	return Dish;
