import { Request, Response, NextFunction } from "express";
import Purchase, { PurchaseInfo } from "../models/purchaseModel";

const getAllStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await Purchase.find();

    const transformedItems = items.map(item => ({
      name: item.productName,
      category: item.category,
      supplier: item.supplier,
      unit:item.unit,
      inQuantity: item.quantity,  
      outQuantity: 0,  
      stock: item.quantity  
    }));

    res.status(200).json(transformedItems);
  } catch (err) {
    next(err);
  }
};

export { getAllStocks };
