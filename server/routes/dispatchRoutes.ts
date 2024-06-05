import express, { Router } from "express";
import { createDispatch, approveDispatch, dispatchItem, returnItem, getAllDispatches, approveReturn } from "../controllers/dispatchController";
import authAdminProtect from '../middleware/authAdminMiddleware';
import checkStockmanagerRole from '../middleware/authRoleStockMiddleware';
import checkManagerRole from '../middleware/authRoleManagerMiddleware';

const router: Router = express.Router();

// Create a Dispatch request
router.post("/", createDispatch);

// Approve a Dispatch request
router.put("/approve", authAdminProtect, checkManagerRole, approveDispatch);

// Approve Dispatch an item
router.put("/dispatch-item", authAdminProtect, checkStockmanagerRole, dispatchItem);

// return item
router.put("/return", returnItem);

// Endpoint for stock managers to approve/reject the return
router.post('/approve-return', authAdminProtect, checkStockmanagerRole, approveReturn);

// get all Dispatch
router.get("/", authAdminProtect, getAllDispatches);

export default router;