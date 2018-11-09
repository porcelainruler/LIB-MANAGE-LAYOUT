module.exports = (sequelize, DataTypes) => {
	var Employee = sequelize.define(
		"Employee",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true
			},

			Name: {
				type: DataTypes.STRING,
				allowNull: false
			},

			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [10, 10],
					isNumeric: true
				}
			},

			streetAddress: {
				type: DataTypes.STRING,
				allowNull: false
			},

			city: {
				type: DataTypes.STRING,
				allowNull: false
			},

			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true
				}
			},

			zipCode: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isNumeric: true
				}
			},

			emailAddress: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true
				}
			},

			profilePicture: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: "./images/users/img0.jpg"
			},

			isEmployee: {
				type: DataTypes.BOOLEAN,
				defaultValue: true
			},

			createdAt: {
				type: DataTypes.DATE,
				field: "memberSince",
				defaultValue: sequelize.literal("NOW()")
			}
		},

		{
			timestamps: false
		}
	);

	require("./js/parentAddAssociation.js")(Employee);

	return Employee;
};