import { Request, Response } from "express";
import Dispatch, { DispatchInfo } from "../models/dispatchModel";
import Stock, { StockInfo } from "../models/stockModel";
import UniqueItem, { UniqueItemInfo } from "../models/uniqueItemModel";

const createDispatch = async (req: Request, res: Response): Promise<void> => {
    try {
      const { employeeId, employeeFullName, issueDate, expectedReturnDate, productId, productName, itemCategory, quantity, purpose, remarks } = req.body;
  
      // Check if the requested quantity is available in stock
      const stockItem = await Stock.findOne({ productId });
      if (!stockItem || stockItem.stock === undefined || stockItem.stock < quantity) {
        res.status(400).json({ error: "Requested quantity not available in stock" });
        return;
      }
  
      // Create a new dispatch record
      const newDispatch = new Dispatch({ employeeId, employeeFullName, issueDate, expectedReturnDate, productId, productName, itemCategory, quantity, purpose, remarks });
  
      await newDispatch.save();
  
      res.status(201).json({ message: "Dispatch created successfully", newDispatch });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const approveDispatch = async (req: Request, res: Response): Promise<void> => {
    try {
      const { dispatchId, status } = req.body;
  
      const dispatch = await Dispatch.findOne({ dispatchId });
      if (!dispatch) {
        res.status(404).json({ error: "Dispatch not found" });
        return;
      }
  
      if (status === 'rejected') {
        dispatch.remarks = 'rejected';
        await dispatch.save();
        res.status(200).json({ message: "Dispatch rejected successfully", dispatch });
        return;
      }
  
      if (status !== 'accepted') {
        res.status(400).json({ error: "Dispatch can only be approved with 'accepted' status" });
        return;
      }
  
      // Update stock quantity and outQty
      const stockItem = await Stock.findOne({ productId: dispatch.productId });
      if (stockItem && stockItem.stock !== undefined && stockItem.outQty !== undefined) {
        stockItem.outQty += dispatch.quantity;
        stockItem.stock -= dispatch.quantity;
        await stockItem.save();
      }
  
      // Update status of unique items in the unique item schema
      const uniqueItems = await UniqueItem.find({ productId: dispatch.productId, status: 'in_stock' }).limit(dispatch.quantity);
      for (const uniqueItem of uniqueItems) {
        uniqueItem.status = 'dispatched';
        uniqueItem.dispatchDate = new Date();
        uniqueItem.employeeId = dispatch.employeeId; // Add employeeId
        await uniqueItem.save();
      }
  
      res.status(200).json({ message: "Dispatch approved successfully", dispatch });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

export { createDispatch, approveDispatch };
