import express, { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController";
import authAdminProtect from '../middleware/authAdminMiddleware';
import checkManagerRole from '../middleware/authRoleManagerMiddleware';

const router: Router = express.Router();

// Create an Supplier registration
router.post("/", authAdminProtect, checkManagerRole, createSupplier);

// Get all Suppliers
router.get("/", authAdminProtect, getAllSuppliers);

// Get a specific Supplier by ID
router.get("/:id", authAdminProtect, getSupplierById);

// Update an Supplier by ID
router.put("/:id", authAdminProtect, checkManagerRole, updateSupplier);

// Delete an Supplier by ID
router.delete("/:id", authAdminProtect, checkManagerRole, deleteSupplier);

export default router;
