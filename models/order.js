module.exports = (sequelize, DataTypes) => {
	var Order = sequelize.define(
		"Order",
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

	Order.associate = models => {
		Order.belongsTo(models.Dish, {
			foreignKey: {
				allowNull: false
			}
		});

		Order.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Order;
};