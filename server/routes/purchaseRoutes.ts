import express, { Router } from "express";
import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  getPurchaseByPurchaseNumber,
} from "../controllers/purchaseController";
import authAdminProtect from '../middleware/authAdminMiddleware';
import checkManagerRole from '../middleware/authRoleManagerMiddleware';
import checkPersonnelRole from '../middleware/authRolePersonnelMiddleware'

const router: Router = express.Router();

// Create a Purchase
router.post("/", authAdminProtect, checkPersonnelRole, createPurchase);

// Get all Purchases
router.get("/", authAdminProtect, getAllPurchases);

// Get a specific Purchase by ID
router.get("/:id", authAdminProtect, getPurchaseById);

// Get a all Purchases by Purchase Number
router.get("/purchaseData/:purchaseNumber", authAdminProtect, getPurchaseByPurchaseNumber);

// Update a Purchase by ID
router.put("/:id", authAdminProtect, checkManagerRole, updatePurchase);

// Delete a Purchase by ID
router.delete("/:id", authAdminProtect, checkPersonnelRole, deletePurchase);

export default router;
