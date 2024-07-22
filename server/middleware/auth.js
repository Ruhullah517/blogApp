const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const secret = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = auth;
