import express, { Router } from "express";
import { getAllUniqueItems, getUniqueItemsByEmployeeId } from "../controllers/uniqueItemController";
import authAdminProtect from '../middleware/authAdminMiddleware';

const router: Router = express.Router();

// Get all unique items
router.get("/", authAdminProtect, getAllUniqueItems);

//Route to get unique items by employee ID
router.get("/employee/:employeeId", getUniqueItemsByEmployeeId);

export default router;
