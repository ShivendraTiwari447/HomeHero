const Booking = require("../models/Booking");
const Service = require("../models/Service");

// ==========================================
// CREATE BOOKING - Customer
// ==========================================

const createBooking = async (req, res) => {
  try {
    const {
      service,
      bookingDate,
      address,
      description,
    } = req.body;

    if (!service || !bookingDate || !address) {
      return res.status(400).json({
        message:
          "Service, booking date and address are required",
      });
    }

    const selectedService = await Service.findById(service);

    if (!selectedService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Inactive service cannot be booked
    if (!selectedService.isActive) {
      return res.status(400).json({
        message: "This service is currently unavailable",
      });
    }

    if (!selectedService.provider) {
      return res.status(400).json({
        message: "This service has no provider",
      });
    }

    const booking = await Booking.create({
      customer: req.user.userId,
      provider: selectedService.provider,
      service: selectedService._id,
      bookingDate,
      address,
      description,
    });

    const populatedBooking = await Booking.findById(
      booking._id
    )
      .populate("customer", "name email")
      .populate("provider", "name email")
      .populate(
        "service",
        "title description price"
      );

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET MY BOOKINGS - Customer
// ==========================================

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user.userId,
    })
      .populate("provider", "name email")
      .populate(
        "service",
        "title description price"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error(
      "Get My Bookings Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET PROVIDER BOOKINGS - Provider
// ==========================================

const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      provider: req.user.userId,
    })
      .populate("customer", "name email")
      .populate(
        "service",
        "title description price"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error(
      "Get Provider Bookings Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET SINGLE BOOKING
// Customer / Provider
// ==========================================

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("customer", "name email")
      .populate("provider", "name email")
      .populate(
        "service",
        "title description price"
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Customer can only see their own booking
    if (
      req.user.role === "customer" &&
      booking.customer._id.toString() !==
        req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to view this booking",
      });
    }

    // Provider can only see their own booking
    if (
      req.user.role === "provider" &&
      booking.provider._id.toString() !==
        req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to view this booking",
      });
    }

    res.status(200).json({
      booking,
    });
  } catch (error) {
    console.error(
      "Get Booking By ID Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET ALL BOOKINGS - Admin
// ==========================================

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email")
      .populate("provider", "name email")
      .populate(
        "service",
        "title description price"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error(
      "Get All Bookings Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// ACCEPT BOOKING - Provider
// ==========================================

const acceptBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({
      _id: id,
      provider: req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message:
          "Only pending bookings can be accepted",
      });
    }

    booking.status = "accepted";

    await booking.save();

    res.status(200).json({
      message: "Booking accepted successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Accept Booking Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// REJECT BOOKING - Provider
// ==========================================

const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({
      _id: id,
      provider: req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        message:
          "Only pending bookings can be rejected",
      });
    }

    booking.status = "rejected";

    await booking.save();

    res.status(200).json({
      message: "Booking rejected successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Reject Booking Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// CANCEL BOOKING - Customer
// ==========================================

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({
      _id: id,
      customer: req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (
      booking.status !== "pending" &&
      booking.status !== "accepted"
    ) {
      return res.status(400).json({
        message:
          "This booking cannot be cancelled",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Cancel Booking Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// COMPLETE BOOKING - Provider
// ==========================================

const completeBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({
      _id: id,
      provider: req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "accepted") {
      return res.status(400).json({
        message:
          "Only accepted bookings can be completed",
      });
    }

    booking.status = "completed";

    await booking.save();

    res.status(200).json({
      message: "Booking completed successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Complete Booking Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  createBooking,
  getMyBookings,
  getProviderBookings,
  getBookingById,
  getAllBookings,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
};