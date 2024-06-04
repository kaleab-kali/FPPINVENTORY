import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import INVStaff from '../models/inventoryStaffModel'; 
import jwt from 'jsonwebtoken';

const createINVStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, firstName, lastName, password, role, phoneNumber, employmentDate } = req.body;

    // Check if Invetory Staff with the same email already exists
    const existingINVStaff = await INVStaff.findOne({ email });
    if (existingINVStaff) {
      res.status(400).json({ message: 'Invetory Staff with this email already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the photo path from the uploaded file
    const photo = req.file?.path;

    // Create the new Invetory Staff
    const newINVStaff = new INVStaff({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
      phoneNumber, 
      employmentDate, 
      photo, 
    });

    // Save the new Invetory Staff
    await newINVStaff.save();

    res.status(201).json({ message: 'Invetory Staff created successfully', newINVStaff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Creat the admin
const createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, firstName, lastName, password, phoneNumber, employmentDate } = req.body;
  
      // Check if Invetory Staff with the same email already exists
      const existingINVStaff = await INVStaff.findOne({ email });
      if (existingINVStaff) {
        res.status(400).json({ message: 'Invetory Staff with this email already exists' });
        return;
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Get the photo path from the uploaded file
      const photo = req.file?.path;
  
      // Create the new Invetory Staff
      const newINVStaff = new INVStaff({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role: "admin",
        phoneNumber,
        employmentDate,
        photo, 
      });
  
      // Save the new Invetory Staff
      await newINVStaff.save();
  
      res.status(201).json({ message: 'Admin created successfully', newINVStaff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const loginINVStaff = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Check if Invetory Staff exists
      const invStaff = await INVStaff.findOne({ email });
      if (!invStaff) {
        res.status(404).json({ message: 'Invetory Staff not found' });
        return;
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, invStaff.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: invStaff._id , email, role: invStaff.role}, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, currentPassword, newPassword } = req.body;
  
      // Check if Invetory Staff exists
      const invStaff = await INVStaff.findOne({ email });
      if (!invStaff) {
        res.status(404).json({ message: 'Invetory Staff not found' });
        return;
      }
  
      // Check if the current password matches
      const isMatch = await bcrypt.compare(currentPassword, invStaff.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Current password is incorrect' });
        return;
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password
      invStaff.password = hashedNewPassword;
      await invStaff.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Get All Inventory Staff
  const getAllINVStaff = async (req: Request, res: Response): Promise<void> => {
    try {
      const invStaff = await INVStaff.find({ role: { $ne: 'admin' } });
      res.status(200).json(invStaff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get Personnel
  const getPersonnel = async (req: Request, res: Response): Promise<void> => {
    try {
      const personnel = await INVStaff.find({ role: 'personnel' });
      res.status(200).json(personnel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateINVStaff = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { email, firstName, lastName, role, phoneNumber, employmentDate, photo } = req.body;
  
      // Find the inventory staff by ID
      const invStaff = await INVStaff.findById(id);
      if (!invStaff) {
        res.status(404).json({ message: 'Inventory Staff not found' });
        return;
      }
  
      // Update the fields excluding the password
      invStaff.email = email || invStaff.email;
      invStaff.firstName = firstName || invStaff.firstName;
      invStaff.lastName = lastName || invStaff.lastName;
      invStaff.role = role || invStaff.role;
      invStaff.phoneNumber = phoneNumber || invStaff.phoneNumber;
      invStaff.employmentDate = employmentDate || invStaff.employmentDate;
  
      // Update the photo 
      if (req.file?.path) {
        invStaff.photo = req.file.path;
      } else {
        invStaff.photo = photo || invStaff.photo;
      }
  
      // Save the updated inventory staff
      await invStaff.save();
  
      res.status(200).json({ message: 'Inventory Staff updated successfully', invStaff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export { createINVStaff, createAdmin, loginINVStaff, changePassword, getAllINVStaff, getPersonnel, updateINVStaff };
