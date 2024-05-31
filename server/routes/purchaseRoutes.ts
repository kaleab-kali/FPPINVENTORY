import express, { Router } from "express";
import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  getPurchaseByPurchaseNumber,
} from "../controllers/purchaseController";

const router: Router = express.Router();

// Create a Purchase
router.post("/", createPurchase);

// Get all Purchases
router.get("/", getAllPurchases);

// Get a specific Purchase by ID
router.get("/:id", getPurchaseById);

// Get a all Purchases by Purchase Number
router.get("/purchaseData/:purchaseNumber", getPurchaseByPurchaseNumber);

// Update a Purchase by ID
router.put("/:id", updatePurchase);

// Delete a Purchase by ID
router.delete("/:id", deletePurchase);

export default router;
