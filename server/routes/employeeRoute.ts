import express, { Router } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  loginController,
} from "../controllers/employeeController";

const router: Router = express.Router();

// Employee login
router.post("/login", loginController);

// Get all employees
router.get("/", getAllEmployees);

// Get a specific employee by ID
router.get("/:id", getEmployeeById);

// Update an employee by ID
router.put("/:id", updateEmployee);

export default router;
