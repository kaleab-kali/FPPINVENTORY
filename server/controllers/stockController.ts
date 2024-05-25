import { Request, Response, NextFunction } from "express";
import Stock from "../models/stockModel";

const getAllStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stocks = await Stock.find().select('productId productName category unit models brand supplier inQty outQty stock');
    res.status(200).json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllStocks };
