import Prescription from "../models/Prescription.js";

// Customer: create prescription
export const createPrescription = async (req, res) => {
  try {
    const { imageUrl, notes } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Prescription image is required",
      });
    }

    const prescription = await Prescription.create({
      customer: req.user.id,
      imageUrl,
      notes: notes || "",
    });

    return res.status(201).json({
      success: true,
      message: "Prescription submitted successfully",
      prescription,
    });
  } catch (error) {
    console.error("Create prescription error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create prescription",
    });
  }
};

// Customer: get own prescriptions
export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      customer: req.user.id,
    })
      .populate("customer", "name email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    console.error("Get my prescriptions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get prescriptions",
    });
  }
};

// Owner: get all prescriptions
export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("customer", "name email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    console.error("Get all prescriptions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get prescriptions",
    });
  }
};

// Owner: get one prescription
export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("customer", "name email")
      .populate("reviewedBy", "name email");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    return res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.error("Get prescription error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get prescription",
    });
  }
};

// Owner: approve or reject prescription
export const updatePrescriptionStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be approved or rejected",
      });
    }

    if (status === "rejected" && !rejectionReason?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewedBy: req.user.id,
        reviewedAt: new Date(),
        rejectionReason: status === "rejected" ? rejectionReason.trim() : "",
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("customer", "name email")
      .populate("reviewedBy", "name email");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Prescription ${status} successfully`,
      prescription,
    });
  } catch (error) {
    console.error("Update prescription status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update prescription",
    });
  }
};
