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

	var Add = sequelize.define(
		"Add",
		{
			createdAt: {
				type: DataTypes.DATE,
				field: "dateCheckedOut",
				defaultValue: sequelize.literal("NOW()")
			}
		},
		{
			timestamps: false
		}
	);

	Add.associate = models => {
		Add.belongsTo(models.Dish, {
			foreignKey: {
				allowNull: false
			}
		});

		Add.belongsTo(models.Employee, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	sequelize.sync()
    .then(() => console.log('Add table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

	module.exports = Add;


	return Add;
