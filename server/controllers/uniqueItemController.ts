import { Request, Response } from "express";
import UniqueItem from "../models/uniqueItemModel";

// Get All Unique Items Controller
const getAllUniqueItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Get All Unique")
    const uniqueItems = await UniqueItem.find();
    console.log("Get All Unique"+uniqueItems);
    
    res.status(200).json(uniqueItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUniqueItemsByEmployeeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const uniqueItems = await UniqueItem.find({ employeeId });

    if (!uniqueItems) {
      res
        .status(404)
        .json({
          message: "No unique items found for the specified employee ID.",
        });
      return;
    }

    res.status(200).json(uniqueItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllUniqueItems, getUniqueItemsByEmployeeId };
