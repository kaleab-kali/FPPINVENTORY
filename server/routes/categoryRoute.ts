import express, { Router } from "express";
import {
  createCategory,
  getAllCategorys,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categroyController";
import authAdminProtect from '../middleware/authAdminMiddleware';
import checkManagerRole from '../middleware/authRoleManagerMiddleware';

const router: Router = express.Router();

// Create an Category registration
router.post("/", authAdminProtect, checkManagerRole, createCategory);

// Get all Categorys
router.get("/", authAdminProtect, getAllCategorys);

// Get a specific Category by ID
router.get("/:id", authAdminProtect, getCategoryById);

// Update an Category by ID
router.put("/:id", authAdminProtect, checkManagerRole, updateCategory);

// Delete an Category by ID
router.delete("/:id", authAdminProtect, checkManagerRole, deleteCategory);

export default router;
