import express, { Router } from "express";
import {
  createCategory,
  getAllCategorys,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categroyController";

const router: Router = express.Router();

// Create an Category registration
router.post("/", createCategory);

// Get all Categorys
router.get("/", getAllCategorys);

// Get a specific Category by ID
router.get("/:id", getCategoryById);

// Update an Category by ID
router.put("/:id", updateCategory);

// Delete an Category by ID
router.delete("/:id", deleteCategory);

export default router;
