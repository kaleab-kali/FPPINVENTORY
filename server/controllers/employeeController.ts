import { Request, Response, NextFunction } from "express";
import Employee from "../models/employeeModel";

const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEmployee = new Employee(req.body);

    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee saved successfully", newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    console.log("Fetched Data:", employee);
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};
const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Updating employee");
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (employee) {
      await employee.save();
      res
        .status(200)
        .json({ message: "Employee updated successfully", employee });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.status(200).json({
      message: "Employee deleted successfully",
      deletedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createEvaluation = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      employeeId,
      workQuality,
      productivity,
      communication,
      collaboration,
      punctuality,
      evaluationYear,
    } = req.body;

    // Calculate the total score
    const total =
      (workQuality +
        productivity +
        communication +
        collaboration +
        punctuality) *
      0.25;

    // Update the employee document with the new evaluation
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    // Add the evaluation to the evaluations array
    const evaluation = {
      employeeId,
      workQuality,
      productivity,
      communication,
      collaboration,
      punctuality,
      evaluationYear,
      total,
    };
    employee.evaluations.push(evaluation);

    await employee.save();

    res
      .status(201)
      .json({ message: "Evaluation added successfully", evaluation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEvaluationByEmployeeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    const evaluations = employee.evaluations;
    res.status(200).json({ evaluations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  createEvaluation,
  getEvaluationByEmployeeId,
};
