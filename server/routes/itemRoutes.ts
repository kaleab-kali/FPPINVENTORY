import express, { Router } from "express";
import {
  createItem,
  getAllItems,
  getItemByProductId,
  updateItem,
  deleteItem,
} from "../controllers/itemController";
import authAdminProtect from '../middleware/authAdminMiddleware';
import checkManagerRole from '../middleware/authRoleManagerMiddleware';

const router: Router = express.Router();

// Create an Item registration
router.post("/", authAdminProtect, checkManagerRole, createItem);

// Get all Items
router.get("/", getAllItems);

// Get a specific Item by ID
router.get("/:id", authAdminProtect, getItemByProductId);

// Update an Item by ID
router.put("/:id", authAdminProtect, checkManagerRole, updateItem);

// Delete an Item by ID
router.delete("/:id", authAdminProtect, checkManagerRole, deleteItem);

export default router;
