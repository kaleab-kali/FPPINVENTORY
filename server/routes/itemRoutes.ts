import express, { Router } from "express";
import {
  createItem,
  getAllItems,
  getItemByProductId,
  updateItem,
  deleteItem,
} from "../controllers/itemController";

const router: Router = express.Router();

// Create an Item registration
router.post("/", createItem);

// Get all Items
router.get("/", getAllItems);

// Get a specific Item by ID
router.get("/:id", getItemByProductId);

// Update an Item by ID
router.put("/:id", updateItem);

// Delete an Item by ID
router.delete("/:id", deleteItem);

export default router;
