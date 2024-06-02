import express, { Router } from "express";
import { createINVStaff, createAdmin, loginINVStaff, changePassword } from "../controllers/inventoryStaffController";
import authAdminProtect from '../middleware/authAdminMiddleware';
import checkRole from '../middleware/authRoleMiddleware';

const router: Router = express.Router();

// Create an employee registration
router.post("/Admin", createAdmin);

// create hrstaff
router.post('/create-invstaff', authAdminProtect, checkRole, createINVStaff);

// Create an employee registration
router.post("/login", loginINVStaff);

// Create an employee registration
router.post("/change-password", authAdminProtect, changePassword);

export default router;