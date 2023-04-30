const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../models');
const User = db.users;

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Check if email already exists in database
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user in database
  const user = {
    fullName,
    email,
    password: hashedPassword,
  };
  const createdUser = await User.create(user);

  // Create and sign JWT token
  const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Create and sign refresh token
  const refreshToken = jwt.sign({ id: createdUser.id }, process.env.REFRESH_TOKEN_SECRET);

  // Save refresh token to database
  createdUser.refreshToken = refreshToken;
  await createdUser.save();

  // Return response with access token and refresh token
  res.status(201).json({ token, refreshToken,createdUser,message:'User Created Successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user with given email exists
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Create and sign JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Create and sign refresh token
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);

  // Save refresh token to database
  user.refreshToken = refreshToken;
  await user.save();

  // Return response with access token and refresh token
  res.status(200).json({ token, refreshToken,user,message:'Logged Successfully' });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  // Check if refresh token is valid
  const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decodedRefreshToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  // Check if user exists
  const user = await User.findOne({ where: { id: decodedRefreshToken.id } });
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // Check if refresh token matches the one in database
  if (user.refreshToken !== refreshToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  // Create and sign new JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Create and sign new refresh token
  const newRefreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);

  // Save new refresh token to database
  user.refreshToken = newRefreshToken;
  await user.save();
  
  // Return response with new access token and refresh token
  res.status(200).json({ token, refreshToken: newRefreshToken });
  };
  
  // add the following line at the bottom to export refreshToken function
//   module.exports = {
//   register,
//   login,
//   refreshToken,
//   };