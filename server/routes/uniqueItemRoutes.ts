import express, { Router } from "express";
import { getAllUniqueItems } from "../controllers/uniqueItemController";
import authAdminProtect from '../middleware/authAdminMiddleware';

const router: Router = express.Router();

// Get all unique items
router.get("/", authAdminProtect, getAllUniqueItems);

export default router;
