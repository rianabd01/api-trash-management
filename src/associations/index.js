const Cities = require('../models/Cities');
const Pictures = require('../models/Pictures');
const Trash = require('../models/Trash');
const Users = require('../models/Users');

Trash.hasMany(Pictures, { as: 'pictures', foreignKey: 'trash_id' });
Pictures.belongsTo(Trash, { foreignKey: 'trash_id' });

Cities.hasMany(Trash, { foreignKey: 'city_id' });
Trash.belongsTo(Cities, { as: 'cities', foreignKey: 'city_id' });

Users.hasMany(Trash, { foreignKey: 'user_uploader_id' });
Trash.belongsTo(Users, { as: 'users', foreignKey: 'user_uploader_id' });

module.exports = {
  Pictures,
  Trash,
  Cities,
  Users,
};
