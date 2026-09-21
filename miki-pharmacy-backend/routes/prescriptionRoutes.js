import express from "express";

import {
  createPrescription,
  getMyPrescriptions,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescriptionStatus,
} from "../controllers/prescriptionController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/", protect, createPrescription);
router.get("/my", protect, getMyPrescriptions);

// Owner routes
router.get("/", protect, getAllPrescriptions);
router.get("/:id", protect, getPrescriptionById);
router.patch("/:id", protect, updatePrescriptionStatus);

export default router;
