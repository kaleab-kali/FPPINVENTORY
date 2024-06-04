import express, { Router } from "express";
import {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
} from "../controllers/unitController";
import authAdminProtect from '../middleware/authAdminMiddleware';
import checkManagerRole from '../middleware/authRoleManagerMiddleware';

const router: Router = express.Router();

// Create an Unit registration
router.post("/", authAdminProtect, checkManagerRole, createUnit);

// Get all Units
router.get("/", authAdminProtect, getAllUnits);

// Get a specific Unit by ID
router.get("/:id", authAdminProtect, getUnitById);

// Update an Unit by ID
router.put("/:id", authAdminProtect, checkManagerRole, updateUnit);

// Delete an Unit by ID
router.delete("/:id", authAdminProtect, checkManagerRole, deleteUnit);

export default router;
