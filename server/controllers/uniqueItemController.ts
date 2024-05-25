import { Request, Response } from "express";
import UniqueItem from "../models/uniqueItemModel";

// Get All Unique Items Controller
const getAllUniqueItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const uniqueItems = await UniqueItem.find();
      res.status(200).json(uniqueItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

export {getAllUniqueItems };