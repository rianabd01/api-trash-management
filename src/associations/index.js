const Cities = require('../models/Cities');
const OTP = require('../models/OTP');
const Pictures = require('../models/Pictures');
const Provinces = require('../models/Provinces');
const Trash = require('../models/Trash');
const TrashProof = require('../models/TrashProof');
const ProofPictures = require('../models/TrashProofPictures');
const Users = require('../models/Users');

Users.hasMany(Trash, { foreignKey: 'user_uploader_id' });
Users.hasMany(TrashProof, { foreignKey: 'user_id' });

Provinces.hasMany(Cities, { foreignKey: 'province_id' });

Cities.belongsTo(Provinces, { foreignKey: 'province_id' });
Cities.hasMany(Trash, { foreignKey: 'city_id' });

Trash.belongsTo(Cities, { as: 'cities', foreignKey: 'city_id' });
Trash.belongsTo(Users, { as: 'users', foreignKey: 'user_uploader_id' });
Trash.hasMany(Pictures, { as: 'pictures', foreignKey: 'trash_id' });
Trash.hasMany(TrashProof, { foreignKey: 'trash_id' });

Pictures.belongsTo(Trash, { foreignKey: 'trash_id' });

TrashProof.belongsTo(Trash, { foreignKey: 'trash_id' });
TrashProof.belongsTo(Users, { foreignKey: 'user_id' });
TrashProof.hasMany(ProofPictures, {
  as: 'proof_pictures',
  foreignKey: 'trash_proof_id',
});

ProofPictures.belongsTo(TrashProof, { foreignKey: 'trash_proof_id' });

module.exports = {
  Pictures,
  Trash,
  Provinces,
  Cities,
  Users,
  TrashProof,
  ProofPictures,
  OTP,
};
