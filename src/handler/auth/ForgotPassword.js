const randomstring = require('randomstring');
const dotenv = require('dotenv');
const sendOTP = require('./EmailService');
const { Users, OTP } = require('../../associations/index');
const sequelize = require('../../sequelize');

dotenv.config();

const loginHandler = async (request, h) => {
  const { username, email } = request.payload;

  // Check Columns Validation
  if (!username || !email) {
    return h
      .response({
        status: 'fail',
        message: 'please fill all columns',
      })
      .code(400);
  }

  // Find user on database
  const user = await Users.findOne({ where: { username, is_verified: 1 } });
  if (!user) {
    return h
      .response({
        status: 'fail',
        message: 'invalid username',
      })
      .code(401);
  }

  if (user.email !== email) {
    return h
      .response({
        status: 'fail',
        message: 'user and email doesnt match',
      })
      .code(401);
  }

  const otp = randomstring.generate({
    length: 6,
    charset: 'numeric',
  });

  let transaction;
  try {
    transaction = await sequelize.transaction();

    const expiresAt = new Date(Date.now() + 10 * 60000); // Expired in 10 minute
    console.log(expiresAt);
    await OTP.upsert({ email, otp, expired_at: expiresAt }, { transaction });

    await sendOTP(email, otp);

    await transaction.commit();

    return h.response({ status: 'success', message: 'OTP sent' }).code(200);
  } catch (error) {
    if (transaction) await transaction.rollback();

    return h
      .response({
        status: 'fail',
        message: 'Internal server error',
        error: error.message,
      })
      .code(500);
  }
};
module.exports = loginHandler;
