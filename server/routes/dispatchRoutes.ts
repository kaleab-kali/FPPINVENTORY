import express, { Router } from "express";
import { createDispatch, approveDispatch, dispatchItem, returnItem, getAllDispatches, approveReturn } from "../controllers/dispatchController";

const router: Router = express.Router();

// Create a Dispatch request
router.post("/", createDispatch);

// Approve a Dispatch request
router.put("/approve", approveDispatch);

// Approve Dispatch an item
router.put("/dispatch-item",dispatchItem);

// return item
router.put("/return", returnItem);

// Endpoint for stock managers to approve/reject the return
router.post('/approve-return',approveReturn);

// get all Dispatch
router.get("/", getAllDispatches);

export default router;