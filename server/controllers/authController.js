require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;
console.log('Secret Key:', process.env.SECRET_KEY);

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        console.log('Signup request received:', { username, email, password });

        if (!username || !email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ error: 'Username, Email, and password are required' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({ error: 'Username already exists' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        console.log('User created successfully:', newUser);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Error creating user' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '4h' });
  
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.json({ message: 'Logged in successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.checkAuth = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ isAuthenticated: false });
  
    try {
      const decoded = jwt.verify(token, secret);
      res.json({ isAuthenticated: true, user: decoded.userId });
    } catch (error) {
      res.json({ isAuthenticated: false });
    }
  };

  exports.logout = (req, res) => {
    console.log('Inside logout');
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };
  
