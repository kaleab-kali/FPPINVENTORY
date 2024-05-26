import express, { Router } from "express";
import { getAllUniqueItems } from "../controllers/uniqueItemController";

const router: Router = express.Router();

// Get all unique items
router.get("/", getAllUniqueItems);

export default router;
