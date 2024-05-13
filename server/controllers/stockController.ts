import { Request, Response, NextFunction } from "express";
import Item, { ItemInfo } from "../models/itemModel";

const getAllStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await Item.find();

    const transformedItems = items.map(item => ({
      name: item.name,
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
