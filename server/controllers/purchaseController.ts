import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Purchase from '../models/purchaseModel';
import Stock from '../models/stockModel';
import UniqueItem from '../models/uniqueItemModel';
import Counter from "../models/Counter"; 

// Create Purchase
// const createPurchase = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const newPurchase = new Purchase(req.body);
//     await newPurchase.save();
//     res.status(201).json({ message: "Purchase created successfully", newPurchase });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const createPurchase = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const purchases = req.body;
//     if (!Array.isArray(purchases)) {
//       res.status(400).json({ error: "Request body should be an array of purchases" });
//       return;
//     }

//     const newPurchases = await Purchase.insertMany(purchases);
//     res.status(201).json({ message: "Purchases created successfully", newPurchases });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getNextSequenceValue = async (counterId: string): Promise<number> => {
  let counter = await Counter.findOneAndUpdate(
    { _id: counterId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  if (!counter) {
    throw new Error("Counter not found or null");
  }

  return counter.seq;
};

const createPurchase = async (req: Request, res: Response): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const purchases = req.body;
    if (!Array.isArray(purchases)) {
      res.status(400).json({ error: "Request body should be an array of purchases" });
      return;
    }

    const purchaseIds: string[] = [];
    for (const purchase of purchases) {
      const nextPurchaseId = await getNextSequenceValue('purchaseId');
      const newPurchaseId = `FPCPUR-${nextPurchaseId.toString().padStart(4, '0')}`;
      purchaseIds.push(newPurchaseId);
    }

    const newPurchases = await Purchase.insertMany(
      purchases.map((purchase, index) => ({ ...purchase, purchaseID: purchaseIds[index] })),
      { session }
    );
    await session.commitTransaction();
    res.status(201).json({ message: "Purchases created successfully", newPurchases });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    session.endSession();
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

// Get purchase by purchaseNumber
const getPurchaseByPurchaseNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const purchase = await Purchase.find({ purchaseNumber: req.params.purchaseNumber });
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

export { createPurchase, updatePurchase, getAllPurchases, getPurchaseById, deletePurchase, getPurchaseByPurchaseNumber };
