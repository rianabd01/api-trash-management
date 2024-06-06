const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// eslint-disable-next-line consistent-return
function getUserIdFromToken(req) {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('token_decoded', decoded);
    return decoded.id;
  }
}

module.exports = getUserIdFromToken;
