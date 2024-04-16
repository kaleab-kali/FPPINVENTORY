import { Request, Response, NextFunction } from "express";
import Item,{ItemInfo} from '../models/itemModel'
const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const newItem = new Item(req.body);

    await newItem.save();

    res.status(201).json({ message: "Item saved successfully", newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    console.log("Fetched Data:", item);
    res.status(200).json(Item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Updating Item");
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (item) {
      await item.save();
      res.status(200).json({ message: "item updated successfully", item });
    } else {
      res.status(404).json({ error: "item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    res.status(200).json({
      message: "Item deleted successfully",
      deletedItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createItem, updateItem, deleteItem, getAllItems, getItemById };
