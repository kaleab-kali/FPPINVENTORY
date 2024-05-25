import express, { Router } from "express";
import { createDispatch, approveDispatch } from "../controllers/dispatchController";

const router: Router = express.Router();

// Create a Dispatch request
router.post("/", createDispatch);

// Approve a Dispatch request
router.put("/approve", approveDispatch);

export default router;
