import express, { Router } from "express";
import {
  createINVStaff,
  createAdmin,
  loginINVStaff,
  changePassword,
  getAllINVStaff,
  getPersonnel,
  updateINVStaff,
} from "../controllers/inventoryStaffController";
import authAdminProtect from "../middleware/authAdminMiddleware";
import checkRole from "../middleware/authRoleMiddleware";
import checkAdminRole from "../middleware/authAdminControlMiddleware";
import checkManagerRole from "../middleware/authRoleManagerMiddleware";
import upload from "../config/multerConfig";

const router: Router = express.Router();

// Create an Admin
router.post("/Admin", createAdmin);

// create hrstaff
router.post(
  "/create-invstaff",
  authAdminProtect,
  checkRole,
  upload,
  createINVStaff
);

// Login for hr staff
router.post("/login", loginINVStaff);

// Create an employee registration
router.post("/change-password", authAdminProtect, changePassword);

// get all staff members
router.get("/", authAdminProtect, checkAdminRole, getAllINVStaff);

// get personnel information
router.get("/personnel", authAdminProtect, checkManagerRole, getPersonnel);

// update inventory staff information
router.put(
  "/update-invstaff/:id",
  authAdminProtect,
  checkAdminRole,
  upload,
  updateINVStaff
);

export default router;
