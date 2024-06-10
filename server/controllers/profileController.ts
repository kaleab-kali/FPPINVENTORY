import { Request, Response } from 'express';
import INVStaff from '../models/inventoryStaffModel';
import Employee from '../models/employeeModel'; // Assuming you have an Employee model

const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = req.user;

    if (user.role === 'admin' || user.role === 'invmanager' || user.role === 'stockmanager' || user.role === 'personnel') {
      const invStaff = await INVStaff.findById(user._id);
      if (!invStaff) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(invStaff);
    } else {
      const employee = await Employee.findById(user._id);
      if (!employee) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(employee);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getProfile };
