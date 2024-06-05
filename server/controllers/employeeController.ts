import { Request, Response, NextFunction } from "express";
import Employee from "../models/employeeModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // Check if employee exists
    const employee = await Employee.findOne({ email: email });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Check if the password matches
    if (employee.password && typeof employee.password === 'string') {
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
    } else {
      res.status(500).json({ error: "Invalid employee password" });
      return;
    }

    // Check if the password is the OTP and hasn't been changed
    if (!employee.passwordChanged) {
      res.status(403).json({ message: "Password change required" });
      return;
    }
    const role= "employee";
    // Generate JWT token
    const token = jwt.sign({ empId: employee.empId }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, role, employeeId:employee.empId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await Employee.findOne({empId:req.params.id});
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

export {
  updateEmployee,
  getAllEmployees,
  getEmployeeById,
  loginController,
};
