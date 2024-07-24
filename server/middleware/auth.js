require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check if the token is in the cookies
  const token = req.cookies.token;

  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  console.log('Token:', token);

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err.message);
      return res.status(401).json({ error: 'Token is not valid' });
    }
    req.user = { _id: decoded.userId }; // Ensure decoded token has a userId
    console.log('Decoded JWT:', req.user);
    next();
  });
};

module.exports = authMiddleware;
