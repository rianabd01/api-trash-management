/* eslint-disable camelcase */
const validator = require('validator');
const { Users } = require('../associations/index');
const sequelize = require('../sequelize');

const registerHandler = async (request, h) => {
  // eslint-disable-next-line object-curly-newline, operator-linebreak
  const { username, password, date_of_birth, full_name, email } =
    request.payload;

  // Check Columns Validation
  if (!username || !password || !date_of_birth || !full_name || !email) {
    return h
      .response({
        status: 'fail',
        message: 'please fill all columns',
      })
      .code(400);
  }

  // Check is username exist
  const checkUsername = await Users.findOne({ where: { username } });
  if (checkUsername) {
    return h
      .response({
        status: 'fail',
        message: 'username has been used',
      })
      .code(401);
  }

  // Check is email valid
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    return h
      .response({
        status: 'fail',
        message: 'email invalid',
      })
      .code(401);
  }
  // Check email domain
  const emailDomain = email.split('@')[1];
  const isEmailDomainValid = validator.isFQDN(emailDomain);
  console.log(emailDomain, isEmailDomainValid);
  if (!isEmailDomainValid) {
    return h
      .response({
        status: 'fail',
        message: 'email domain invalid',
      })
      .code(401);
  }

  // Check is email exist
  const checkEmail = await Users.findOne({ where: { email } });
  if (checkEmail) {
    return h
      .response({
        status: 'fail',
        message: 'email has been used',
      })
      .code(401);
  }

  let transaction;
  try {
    transaction = await sequelize.transaction();
    const user = await Users.create(
      {
        full_name,
        date_of_birth,
        email,
        username,
        password,
      },
      { transaction },
    );

    await transaction.commit();

    return h
      .response({
        status: 'success',
        message: 'register success!',
        data: {
          user_id: user.user_id,
          full_name: user.full_name,
          username: user.username,
        },
      })
      .code(201);
  } catch (error) {
    if (transaction) await transaction.rollback();
    return h
      .response({
        status: 'fail',
        message: 'register failed!',
        error,
      })
      .code(500);
  }
};

module.exports = registerHandler;
