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

    // Admin ko restrict nahi karna
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

module.exports = {
  getAdminStats,
  getAllUsers,
  toggleUserStatus,
};