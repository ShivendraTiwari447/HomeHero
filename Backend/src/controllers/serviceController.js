const Service = require("../models/Service");

// Create Service
const createService = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    if (!title || !description || !category || price === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const service = await Service.create({
      title,
      description,
      category,
      price,
      provider: req.user.userId,
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

// Get All Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

// Get Single Service
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "provider",
      "name email phone"
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch service",
      error: error.message,
    });
  }
};

// Update Service
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (service.provider.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only update your own services",
      });
    }

    const {
      title,
      description,
      category,
      price,
      isActive,
    } = req.body;

    service.title = title ?? service.title;
    service.description = description ?? service.description;
    service.category = category ?? service.category;
    service.price = price ?? service.price;
    service.isActive = isActive ?? service.isActive;

    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (service.provider.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your own services",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete service",
      error: error.message,
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};