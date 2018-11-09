module.exports = function associateHasMany(parent) {
	parent.associate = models => {
        parent.hasMany(models.Add);
        /*
        parent.hasMany(models.CheckOutHistory);
		parent.hasMany(models.Favorite);
        parent.hasMany(models.Review);
        */
	};
};