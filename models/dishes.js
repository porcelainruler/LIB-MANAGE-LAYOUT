module.exports = (sequelize, DataTypes) => {
	var Dish = sequelize.define(
		"Dish",
		{
			dishType: {
				type: DataTypes.STRING,
				allowNull: false
			},

			industryIdentifier: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isAlphanumeric: true
				},
				defaultValue: null
			},

			totalStock: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},			

			title: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null
			},

			chef: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null
			},

			summary: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: null
			},

			image: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "./images/buffet.png"
			},

			createdAt: {
				type: DataTypes.DATE,
				field: "firstArrivalDate",
				defaultValue: sequelize.literal("NOW()")
			}
		},

		{
			timestamps: false
		}
	);

	require("./js/parentAddAssociation.js")(Dish);
	require("./js/parentOrderAssociation.js")(Dish);

	return Dish;
};