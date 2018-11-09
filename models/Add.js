module.exports = (sequelize, DataTypes) => {
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

	return Add;
};