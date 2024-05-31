import { Request, Response, NextFunction } from "express";
import Purchase from '../models/purchaseModel';
import Stock from '../models/stockModel';
import UniqueItem from '../models/uniqueItemModel';

// Create Purchase
const createPurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save();
    res.status(201).json({ message: "Purchase created successfully", newPurchase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Purchase and related models if status is 'approved'
const updatePurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchase = await Purchase.findOne({purchaseID : req.params.id});
    if (!purchase) {
      res.status(404).json({ error: "Purchase not found" });
      return;
    }
    
    Object.assign(purchase, req.body);
    if (purchase.status === 'approved' && req.body.status !== 'approved') {
      // Generate unique items and update stock if status changes to approved
      await purchase.save(); // Save the purchase to trigger post save hook
    } else {
      await purchase.save();
    }

    res.status(200).json({ message: "Purchase updated successfully", purchase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all purchases
const getAllPurchases = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get purchase by ID
const getPurchaseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchase = await Purchase.findOne({purchaseID : req.params.id});
    if (!purchase) {
      res.status(404).json({ error: "Purchase not found" });
      return;
    }
    res.status(200).json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete purchase by ID
const deletePurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPurchase = await Purchase.findOneAndDelete({purchaseID : req.params.id});
    if (!deletedPurchase) {
      res.status(404).json({ error: "Purchase not found" });
      return;
    }
    res.status(200).json({ message: "Purchase deleted successfully", deletedPurchase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createPurchase, updatePurchase, getAllPurchases, getPurchaseById, deletePurchase };
