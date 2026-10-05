const express = require("express");

const {
  getAdminStats,
  getAllUsers,
  toggleUserStatus,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ==================================
// Admin Dashboard Stats
// GET /api/admin/stats
// ==================================
router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getAdminStats
);

// ==================================
// Get All Users
// GET /api/admin/users
// ==================================
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

// ==================================
// Restrict / Unrestrict User
// PATCH /api/admin/users/:id/status
// ==================================
router.patch(
  "/users/:id/status",
  protect,
  authorizeRoles("admin"),
  toggleUserStatus
);

module.exports = router;