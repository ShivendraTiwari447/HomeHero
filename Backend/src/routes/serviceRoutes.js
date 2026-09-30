const express = require("express");

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Provider Only Routes
router.post(
  "/",
  protect,
  authorizeRoles("provider"),
  createService
);

router.put(
  "/:id",
  protect,
  authorizeRoles("provider"),
  updateService
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("provider"),
  deleteService
);

module.exports = router;