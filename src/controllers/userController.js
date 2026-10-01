const User = require("../models/User");

const updateProfile = async (req, res) => {
  const { name, avatar } = req.body;

  if (name !== undefined) req.user.name = name;
  if (avatar !== undefined) req.user.avatar = avatar;

  const user = await req.user.save();

  res.json({
    success: true,
    user: user.toSafeObject()
  });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Current password and new password are required"
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "New password must be at least 8 characters"
    });
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.comparePassword(currentPassword))) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect"
    });
  }

  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: "Password changed successfully"
  });
};

const listUsers = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  const search = String(req.query.search || "").trim();

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      }
    : {};

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(filter)
  ]);

  res.json({
    success: true,
    users: users.map((user) => user.toSafeObject()),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, user: user.toSafeObject() });
};

const updateUser = async (req, res) => {
  const { name, email, role, isActive, avatar } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (email && email.toLowerCase() !== user.email) {
    const emailExists = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: user._id }
    });

    if (emailExists) {
      return res.status(409).json({ success: false, message: "Email is already in use" });
    }

    user.email = email.toLowerCase();
  }

  if (name !== undefined) user.name = name;
  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;
  if (avatar !== undefined) user.avatar = avatar;

  await user.save();

  res.json({ success: true, user: user.toSafeObject() });
};

const deleteUser = async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot delete your own admin account"
    });
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "User deleted successfully" });
};

module.exports = {
  updateProfile,
  changePassword,
  listUsers,
  getUser,
  updateUser,
  deleteUser
};
