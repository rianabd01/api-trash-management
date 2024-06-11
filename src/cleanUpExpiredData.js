const { Op } = require('sequelize');
const { Users, OTP } = require('./associations/index');

const cleanUpExpiredData = async () => {
  const now = new Date();

  // Remove OTP that have expired
  await OTP.destroy({
    where: {
      expired_at: {
        [Op.lt]: now,
      },
    },
  });

  // Remove users that haven't been verified for 24 hours
  const verificationTimeLimit = new Date(now - 24 * 60 * 60 * 1000);
  await Users.destroy({
    where: {
      is_verified: false,
      created_at: {
        [Op.lt]: verificationTimeLimit,
      },
    },
  });
};

module.exports = cleanUpExpiredData;
