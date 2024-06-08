const { Op } = require('sequelize');
const { Users, OTP } = require('../../associations/index');

const verifyOTPHandler = async (request, h) => {
  const { email, otp } = request.payload;

  try {
    const record = await OTP.findOne({
      where: { email, otp, expired_at: { [Op.gt]: new Date() } },
    });

    console.log(record);
    if (!record) {
      return h
        .response({
          status: 'fail',
          message: 'Invalid or expired OTP',
        })
        .code(400);
    }

    // Mark user as verified
    await Users.update({ is_verified: 1 }, { where: { email } });
    await OTP.destroy({ where: { email } });

    return h
      .response({
        status: 'success',
        message: 'OTP verified successfully',
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'Failed to verify OTP',
        error,
      })
      .code(500);
  }
};

module.exports = verifyOTPHandler;
