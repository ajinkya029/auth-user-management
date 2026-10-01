const express = require("express");
const {
  updateProfile,
  changePassword,
  listUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.patch("/profile", protect, updateProfile);
router.patch("/change-password", protect, changePassword);

router.use(protect, adminOnly);
router.get("/", listUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
