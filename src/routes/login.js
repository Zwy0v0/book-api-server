const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = require('../constant')
const User = require("../models/userModel");

router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  if (!user) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({
    data: { id: user._id, name: user.name, role: user.role, status: user.status, nickName: user.nickName },
    success: true,
    token
  });
});

module.exports = router;