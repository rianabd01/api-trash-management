const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Users } = require('../associations/index');

dotenv.config();

const loginHandler = async (request, h) => {
  const { username, password } = request.payload;

  // Columns Validation
  if (!username || !password) {
    return h
      .response({
        status: 'fail',
        message: 'please fill all columns',
      })
      .code(400);
  }
  // Find user in database
  const user = await Users.findOne({ where: { username } });
  if (!user) {
    return h
      .response({
        status: 'fail',
        message: 'invalid username',
      })
      .code(401);
  }

  // Password verification
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return h
      .response({
        status: 'fail',
        message: 'invalid password',
      })
      .code(401);
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.user_id,
      username: user.username,
    },
    process.env.JWT_KEY,
    { expiresIn: '1h' },
  );

  return h
    .response({
      status: 'success',
      message: "you're logged in",
      token,
      user_id: user.user_id,
    })
    .code(200);
};

module.exports = loginHandler;
