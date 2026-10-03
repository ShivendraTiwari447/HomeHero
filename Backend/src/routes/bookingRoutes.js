const express = require("express");

const {
  createBooking,
  getMyBookings,
  getProviderBookings,
  getBookingById,
  getAllBookings,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// CUSTOMER ROUTES
// ==========================================

// Create booking
router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  createBooking
);

// Get customer's bookings
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("customer"),
  getMyBookings
);

// ==========================================
// PROVIDER ROUTES
// ==========================================

// Get provider's bookings
router.get(
  "/provider",
  authMiddleware,
  roleMiddleware("provider"),
  getProviderBookings
);

// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all bookings
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllBookings
);

// ==========================================
// COMMON CUSTOMER / PROVIDER ROUTES
// ==========================================

// Get single booking
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("customer", "provider"),
  getBookingById
);

// ==========================================
// CUSTOMER ACTIONS
// ==========================================

// Cancel booking
router.patch(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware("customer"),
  cancelBooking
);

// ==========================================
// PROVIDER ACTIONS
// ==========================================

// Accept booking
router.patch(
  "/:id/accept",
  authMiddleware,
  roleMiddleware("provider"),
  acceptBooking
);

// Reject booking
router.patch(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("provider"),
  rejectBooking
);

// Complete booking
router.patch(
  "/:id/complete",
  authMiddleware,
  roleMiddleware("provider"),
  completeBooking
);

module.exports = router;
