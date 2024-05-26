import express, { Router } from "express";
import { createDispatch, approveDispatch, returnItem, getAllDispatches } from "../controllers/dispatchController";

const router: Router = express.Router();

// Create a Dispatch request
router.post("/", createDispatch);

// Approve a Dispatch request
router.put("/approve", approveDispatch);

// return item
router.put("/return", returnItem);

// get all Dispatch
router.get("/", getAllDispatches);

export default router;
