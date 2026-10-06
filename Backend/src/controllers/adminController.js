const User = require("../models/User");
const Service = require("../models/Service");
const Booking = require("../models/Booking");

// ===============================
// Get Admin Dashboard Stats
// ===============================

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const customers = await User.countDocuments({
      role: "customer",
    });
    const providers = await User.countDocuments({
      role: "provider",
    });
    const services = await Service.countDocuments();
    const bookings = await Booking.countDocuments();

    res.status(200).json({
      totalUsers,
      customers,
      providers,
      services,
      bookings,
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      message: "Failed to fetch admin statistics",
    });
  }
};

// ===============================
// Get All Users
// ===============================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// ===============================
// Restrict / Unrestrict User
// ===============================

const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Admin cannot be restricted
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin cannot be restricted",
      });
    }

    user.isRestricted = !user.isRestricted;

    await user.save();

    res.status(200).json({
      message: user.isRestricted
        ? "User restricted successfully"
        : "User unrestricted successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isRestricted: user.isRestricted,
      },
    });
  } catch (error) {
    console.error("Toggle user status error:", error);

    res.status(500).json({
      message: "Failed to update user status",
    });
  }
};

// ===============================
// Get All Services - Admin
// ===============================

const getAllServicesForAdmin = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Admin services error:", error);

    res.status(500).json({
      message: "Failed to fetch services",
    });
  }
};

// ===============================
// Activate / Deactivate Service
// ===============================

const toggleServiceStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    service.isActive = !service.isActive;

    await service.save();

    res.status(200).json({
      message: service.isActive
        ? "Service activated successfully"
        : "Service deactivated successfully",

      service,
    });
  } catch (error) {
    console.error("Toggle service status error:", error);

    res.status(500).json({
      message: "Failed to update service status",
    });
  }
};

// ===============================
// Delete Service - Admin
// ===============================

const deleteServiceByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Admin delete service error:", error);

    res.status(500).json({
      message: "Failed to delete service",
    });
  }
};

module.exports = {
  getAdminStats,
  getAllUsers,
  toggleUserStatus,
  getAllServicesForAdmin,
  toggleServiceStatus,
  deleteServiceByAdmin,
};