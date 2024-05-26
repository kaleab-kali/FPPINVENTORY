import express, { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  createEvaluation,
  getEvaluationByEmployeeId,
} from "../controllers/employeeController";

const router: Router = express.Router();

// Create an employee registration
router.post("/", createEmployee);

// Get all employees
router.get("/", getAllEmployees);

// Get a specific employee by ID
router.get("/:id", getEmployeeById);

// Update an employee by ID
router.put("/:id", updateEmployee);

// Delete an employee by ID
router.delete("/:id", deleteEmployee);

// Create an employee evaluations
router.post("/evaluation", createEvaluation);

// Get a specific employee by ID
router.get("/evaluation/:employeeId", getEvaluationByEmployeeId);

export default router;
