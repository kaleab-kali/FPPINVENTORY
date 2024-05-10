import express, { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController";

const router: Router = express.Router();

// Create an Supplier registration
router.post("/", createSupplier);

// Get all Suppliers
router.get("/", getAllSuppliers);

// Get a specific Supplier by ID
router.get("/:id", getSupplierById);

// Update an Supplier by ID
router.put("/:id", updateSupplier);

// Delete an Supplier by ID
router.delete("/:id", deleteSupplier);

export default router;
