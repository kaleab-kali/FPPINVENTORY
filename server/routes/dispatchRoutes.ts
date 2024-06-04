import express, { Router } from "express";
import { createDispatch, approveDispatch, returnItem, getAllDispatches, dispatchItem } from "../controllers/dispatchController";

const router: Router = express.Router();

// Create a Dispatch request
router.post("/", createDispatch);

// Approve a Dispatch request
router.put("/approve", approveDispatch);

// Approve Dispatch an item
router.put("/dispatch-item", dispatchItem);

// return item
router.put("/return", returnItem);

// get all Dispatch
router.get("/", getAllDispatches);

export default router;
