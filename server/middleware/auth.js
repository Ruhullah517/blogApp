require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Token missing');
    return res.status(401).json({ error: 'Token missing' });
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
