const User = require("../models/User");
const generateToken = require("../utils/token");
const { getCookieOptions } = require("../config/cookie");

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = generateToken(user._id.toString());
  res.cookie("token", token, getCookieOptions());

  return res.status(statusCode).json({
    success: true,
    user: user.toSafeObject()
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ success: false, message: "Email is already registered" });
  }

  const user = await User.create({ name, email, password });
  return sendAuthResponse(res, user, 201);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  if (!user.isActive) {
    return res.status(403).json({ success: false, message: "Account is disabled" });
  }

  return sendAuthResponse(res, user);
};

const logout = async (req, res) => {
  res.clearCookie("token", getCookieOptions());
  return res.json({ success: true, message: "Logged out successfully" });
};

const me = async (req, res) => {
  return res.json({ success: true, user: req.user.toSafeObject() });
};

module.exports = { register, login, logout, me };
