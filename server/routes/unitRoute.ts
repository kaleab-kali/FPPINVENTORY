import express, { Router } from "express";
import {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
} from "../controllers/unitController";

const router: Router = express.Router();

// Create an Unit registration
router.post("/", createUnit);

// Get all Units
router.get("/", getAllUnits);

// Get a specific Unit by ID
router.get("/:id", getUnitById);

// Update an Unit by ID
router.put("/:id", updateUnit);

// Delete an Unit by ID
router.delete("/:id", deleteUnit);

export default router;
