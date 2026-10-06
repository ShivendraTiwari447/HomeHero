const express = require("express");

const {
  getAdminStats,
  getAllUsers,
  toggleUserStatus,
  getAllServicesForAdmin,
  toggleServiceStatus,
  deleteServiceByAdmin,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ======================================
// Admin Dashboard Stats
// ======================================

router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getAdminStats
);

// ======================================
// Admin Users Management
// ======================================

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.patch(
  "/users/:id/status",
  protect,
  authorizeRoles("admin"),
  toggleUserStatus
);

// ======================================
// Admin Services Management
// ======================================

router.get(
  "/services",
  protect,
  authorizeRoles("admin"),
  getAllServicesForAdmin
);

router.patch(
  "/services/:id/status",
  protect,
  authorizeRoles("admin"),
  toggleServiceStatus
);

router.delete(
  "/services/:id",
  protect,
  authorizeRoles("admin"),
  deleteServiceByAdmin
);

module.exports = router;