import { Request, Response, NextFunction } from "express";
import Item,{ItemInfo} from '../models/itemModel'
import Stock from '../models/stockModel'
import NotificationService from '../services/notificationService';
import { getInventoryPersonnelIds } from '../services/inventoryPersonnelService';

// const createItem = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Create a new Item document using the request body
//     const newItem = new Item(req.body);
//     console.log("New Item:", newItem);

//     // Save the item to the database
//     await newItem.save();

//     // Extract necessary fields for the Stock document
//     const {
//       productID,
//       name,
//       category,
//       unit,
//       models,
//       brand,
//       supplier,
//       returnable
//     } = newItem;

//     // Create a new Stock document using the new Item information
//     const newStock = new Stock({
//       productId: productID,
//       productName: name,
//       category: category,
//       unit: unit,
//       models: models,
//       brand: brand,
//       supplier: supplier,
//       inQty: 0, // Initialize with 0 
//       outQty: 0, // Initialize with 0
//       stock: 0   // Initialize with 0 
//     });

//     // Save the stock to the database
//     await newStock.save();

//     res.status(201).json({ message: "Item and Stock saved successfully", newItem, newStock });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a new Item document using the request body
    const newItem = new Item(req.body);
    console.log("New Item:", newItem);

    // Save the item to the database
    await newItem.save();

    // Extract necessary fields for the Stock document
    const {
      productID,
      name,
      category,
      unit,
      models,
      brand,
      supplier,
      returnable
    } = newItem;

    // Create a new Stock document using the new Item information
    const newStock = new Stock({
      productId: productID,
      productName: name,
      category: category,
      unit: unit,
      models: models,
      brand: brand,
      supplier: supplier,
      inQty: 0, // Initialize with 0 
      outQty: 0, // Initialize with 0
      stock: 0   // Initialize with 0 
    });

    // Save the stock to the database
    await newStock.save();

    // Fetch inventory personnel IDs
    const inventoryPersonnelIds = await getInventoryPersonnelIds();

    // Send notifications to inventory personnel
    for (const personnelId of inventoryPersonnelIds) {
      await NotificationService.createNotification(personnelId.toString(), 'New Product Added', `A new product named ${name} has been added to the inventory.`);
    }

    res.status(201).json({ message: "Item and Stock saved successfully", newItem, newStock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getItemByProductId = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findOne({ productID: req.params.id });
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    console.log("Fetched Data:", item);
    res.status(200).json(item);
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
    const item = await Item.findOneAndUpdate(
      { productID: req.params.id },
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
    const deletedItem = await Item.findOneAndDelete({ productID: req.params.id });
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

export { createItem, updateItem, deleteItem, getAllItems, getItemByProductId };
