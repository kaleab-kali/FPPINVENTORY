// import { Request, Response } from "express";
// import Dispatch, { DispatchInfo } from "../models/dispatchModel";
// import Stock, { StockInfo } from "../models/stockModel";
// import UniqueItem, { UniqueItemInfo } from "../models/uniqueItemModel";
// import Employee from "../models/employeeModel";

// const createDispatch = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       employeeId,
//       employeeFullName,
//       issueDate,
//       expectedReturnDate,
//       productId,
//       productName,
//       itemCategory,
//       quantity,
//       purpose,
//       status,
//     } = req.body;

//     //check if employee exists
//     const employee = await Employee.findOne({ empId: employeeId });
//     if (!employee) {
//       res.status(400).json({ error: "Employee not found" });
//       return;
//     }

//     // Check if the requested quantity is available in stock
//     const stockItem = await Stock.findOne({ productId });
//     if (
//       !stockItem ||
//       stockItem.stock === undefined ||
//       stockItem.stock < quantity
//     ) {
//       res
//         .status(400)
//         .json({ error: "Requested quantity not available in stock" });
//       return;
//     }

//     // Create a new dispatch record
//     const newDispatch = new Dispatch({
//       employeeId,
//       employeeFullName,
//       issueDate,
//       expectedReturnDate,
//       productId,
//       productName,
//       itemCategory,
//       quantity,
//       purpose,
//       status,
//     });

//     await newDispatch.save();

//     res
//       .status(201)
//       .json({ message: "Dispatch created successfully", newDispatch });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

//   const approveDispatch = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { dispatchId, status } = req.body;

//       const dispatch = await Dispatch.findOne({ dispatchId });
//       if (!dispatch) {
//         res.status(404).json({ error: "Dispatch not found" });
//         return;
//       }

//       if (status === 'rejected') {
//         dispatch.status = 'rejected';
//         await dispatch.save();
//         res.status(200).json({ message: "Dispatch rejected successfully", dispatch });
//         return;
//       }

//       if (status !== 'approved') {
//         res.status(400).json({ error: "Dispatch can only be approved with 'approved' status" });
//         return;
//       }

//       // Update stock quantity and outQty
//       const stockItem = await Stock.findOne({ productId: dispatch.productId });
//       if (stockItem && stockItem.stock !== undefined && stockItem.outQty !== undefined) {
//         stockItem.outQty += dispatch.quantity;
//         stockItem.stock -= dispatch.quantity;
//         await stockItem.save();
//       }

//       // Update status of unique items in the unique item schema
//       const uniqueItems = await UniqueItem.find({ productId: dispatch.productId, status: 'in_stock' }).limit(dispatch.quantity);
//       for (const uniqueItem of uniqueItems) {
//         uniqueItem.status = 'dispatched';
//         uniqueItem.dispatchDate = new Date();
//         uniqueItem.employeeId = dispatch.employeeId; // Add employeeId
//         dispatch.status = 'approved';
//         await dispatch.save();
//         await uniqueItem.save();
//       }

//       res.status(200).json({ message: "Dispatch approved successfully", dispatch });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };

//   // Return Item Controller
// const returnItem = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { uniqueId, employeeId } = req.body;

//     // Find the unique item that is being returned
//     const uniqueItem = await UniqueItem.findOne({ uniqueId, employeeId, status: 'dispatched' });
//     if (!uniqueItem) {
//       res.status(400).json({ error: "Item not found or employee mismatch" });
//       return;
//     }

//     // Find the corresponding stock item
//     const stockItem = await Stock.findOne({ productId: uniqueItem.productId });
//     if (!stockItem) {
//       res.status(400).json({ error: "Stock item not found" });
//       return;
//     }

//     // Update the unique item's status and return date
//     uniqueItem.status = 'in_stock';
//     uniqueItem.returnDate = new Date();
//     await uniqueItem.save();

//     // Update the stock item's quantity and outQty
//     if (stockItem.stock !== undefined) {
//       stockItem.stock += 1;  // Increase stock by 1
//     }

//     if (stockItem.outQty !== undefined) {
//       stockItem.outQty -= 1; // Decrease outQty by 1
//     }

//     await stockItem.save();

//     res.status(200).json({ message: "Item returned successfully", uniqueItem, stockItem });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Get All Dispatches Controller
// const getAllDispatches = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const dispatches = await Dispatch.find();
//     res.status(200).json(dispatches);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export { createDispatch, approveDispatch, returnItem, getAllDispatches };

// Compare this snippet from server/routes/dispatchRoutes.ts: new ====================================================

import { Request, Response } from "express";
import Dispatch, { DispatchInfo } from "../models/dispatchModel";
import Stock, { StockInfo } from "../models/stockModel";
import UniqueItem, { UniqueItemInfo } from "../models/uniqueItemModel";
import Employee from "../models/employeeModel";

const createDispatch = async (req: Request, res: Response): Promise<void> => {
  console.log("createDispatch");
  try {
    const {
      employeeId,
      employeeFullName,
      issueDate,
      expectedReturnDate,
      productId,
      productName,
      itemCategory,
      quantity,
      purpose,
      status,
    } = req.body;

    //check if employee exists
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      res.status(400).json({ error: "Employee not found" });
      return;
    }

    // Check if the requested quantity is available in stock
    const stockItem = await Stock.findOne({ productId });
    if (
      !stockItem ||
      stockItem.stock === undefined ||
      stockItem.stock < quantity
    ) {
      res
        .status(400)
        .json({ error: "Requested quantity not available in stock" });
      return;
    }

    // Create a new dispatch record
    const newDispatch = new Dispatch({
      employeeId,
      employeeFullName,
      issueDate,
      expectedReturnDate,
      productId,
      productName,
      itemCategory,
      quantity,
      purpose,
      status,
    });

    await newDispatch.save();

    res
      .status(201)
      .json({ message: "Dispatch created successfully", newDispatch });
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

    if (status === "rejected") {
      dispatch.status = "rejected";
      await dispatch.save();
      res
        .status(200)
        .json({ message: "Dispatch rejected successfully", dispatch });
      return;
    }

    if (status !== "approved") {
      res
        .status(400)
        .json({
          error: "Dispatch can only be approved with 'approved' status",
        });
      return;
    }

    dispatch.status = "approved";
    await dispatch.save();

    res
      .status(200)
      .json({ message: "Dispatch approved successfully", dispatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const dispatchItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dispatchId } = req.body;

    const dispatch = await Dispatch.findOne({ dispatchId });
    if (!dispatch) {
      res.status(404).json({ error: "Dispatch not found" });
      return;
    }

    if (dispatch.status !== "approved") {
      res
        .status(400)
        .json({
          error: "Dispatch must be approved before it can be dispatched",
        });
      return;
    }

    // Update stock quantity and outQty
    const stockItem = await Stock.findOne({ productId: dispatch.productId });
    if (
      stockItem &&
      stockItem.stock !== undefined &&
      stockItem.outQty !== undefined
    ) {
      stockItem.outQty += dispatch.quantity;
      stockItem.stock -= dispatch.quantity;
      await stockItem.save();
    }

    // Update status of unique items in the unique item schema
    const uniqueItems = await UniqueItem.find({
      productId: dispatch.productId,
      status: "in_stock",
    }).limit(dispatch.quantity);
    for (const uniqueItem of uniqueItems) {
      uniqueItem.status = "dispatched";
      uniqueItem.dispatchDate = new Date();
      uniqueItem.employeeId = dispatch.employeeId; // Add employeeId
      await uniqueItem.save();
    }

    dispatch.status = "dispatched";
    await dispatch.save();

    res.status(200).json({ message: "Item dispatched successfully", dispatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// const approveDispatch = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { dispatchId, status } = req.body;

//     const dispatch = await Dispatch.findOne({ dispatchId });
//     if (!dispatch) {
//       res.status(404).json({ error: "Dispatch not found" });
//       return;
//     }

//     if (status === 'rejected') {
//       dispatch.status = 'rejected';
//       await dispatch.save();
//       res.status(200).json({ message: "Dispatch rejected successfully", dispatch });
//       return;
//     }

//     if (status !== 'approved') {
//       res.status(400).json({ error: "Dispatch can only be approved with 'approved' status" });
//       return;
//     }

//     // Update stock quantity and outQty
//     const stockItem = await Stock.findOne({ productId: dispatch.productId });
//     if (stockItem && stockItem.stock !== undefined && stockItem.outQty !== undefined) {
//       stockItem.outQty += dispatch.quantity;
//       stockItem.stock -= dispatch.quantity;
//       await stockItem.save();
//     }

//     // Update status of unique items in the unique item schema
//     const uniqueItems = await UniqueItem.find({ productId: dispatch.productId, status: 'in_stock' }).limit(dispatch.quantity);
//     for (const uniqueItem of uniqueItems) {
//       uniqueItem.status = 'dispatched';
//       uniqueItem.dispatchDate = new Date();
//       uniqueItem.employeeId = dispatch.employeeId; // Add employeeId
//       dispatch.status = 'approved';
//       await dispatch.save();
//       await uniqueItem.save();
//     }

//     res.status(200).json({ message: "Dispatch approved successfully", dispatch });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Return Item Controller
// const returnItem = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { uniqueId, employeeId } = req.body;

//     // Find the unique item that is being returned
//     const uniqueItem = await UniqueItem.findOne({ uniqueId, employeeId, status: 'dispatched' });
//     if (!uniqueItem) {
//       res.status(400).json({ error: "Item not found or employee mismatch" });
//       return;
//     }

//     // Find the corresponding stock item
//     const stockItem = await Stock.findOne({ productId: uniqueItem.productId });
//     if (!stockItem) {
//       res.status(400).json({ error: "Stock item not found" });
//       return;
//     }

//     // Update the unique item's status and return date
//     uniqueItem.status = 'in_stock';
//     uniqueItem.returnDate = new Date();
//     await uniqueItem.save();

//     // Update the stock item's quantity and outQty
//     if (stockItem.stock !== undefined) {
//       stockItem.stock += 1;  // Increase stock by 1
//     }

//     if (stockItem.outQty !== undefined) {
//       stockItem.outQty -= 1; // Decrease outQty by 1
//     }

//     await stockItem.save();

//     res.status(200).json({ message: "Item returned successfully", uniqueItem, stockItem });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const returnItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uniqueId, employeeId } = req.body;

    // Find the unique item that is being returned
    const uniqueItem = await UniqueItem.findOne({
      uniqueId,
      employeeId,
      status: "dispatched",
    });
    if (!uniqueItem) {
      res.status(400).json({ error: "Item not found or employee mismatch" });
      return;
    }

    // Set approval status to pending
    uniqueItem.approvalStatus = "pending";
    await uniqueItem.save();

    res
      .status(200)
      .json({
        message: "Return request submitted, awaiting approval",
        uniqueItem,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const approveReturn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { uniqueId, approve } = req.body;

    // Find the unique item that is being approved/rejected
    const uniqueItem = await UniqueItem.findOne({
      uniqueId,
      approvalStatus: "pending",
    });
    if (!uniqueItem) {
      res.status(400).json({ error: "Pending return request not found" });
      return;
    }

    if (approve) {
      // If approved, update the unique item's status and return date
      uniqueItem.status = "in_stock";
      uniqueItem.returnDate = new Date();
      uniqueItem.approvalStatus = "approved";
      uniqueItem.condition = req.body.condition;
      await uniqueItem.save();

      // Find the corresponding stock item
      const stockItem = await Stock.findOne({
        productId: uniqueItem.productId,
      });
      if (!stockItem) {
        res.status(400).json({ error: "Stock item not found" });
        return;
      }

      // Update the stock item's quantity and outQty
      if (stockItem.stock !== undefined) {
        stockItem.stock += 1; // Increase stock by 1
      }

      if (stockItem.outQty !== undefined) {
        stockItem.outQty -= 1; // Decrease outQty by 1
      }

      await stockItem.save();

      res
        .status(200)
        .json({
          message: "Item return approved and processed",
          uniqueItem,
          stockItem,
        });
    } else {
      // If rejected, update the unique item's status and condition
      uniqueItem.status = "rejected";
      uniqueItem.approvalStatus = "rejected";
      uniqueItem.condition = req.body.condition;
      await uniqueItem.save();

      res.status(200).json({ message: "Item return rejected", uniqueItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Dispatches Controller
const getAllDispatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const dispatches = await Dispatch.find();
    res.status(200).json(dispatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createDispatch,
  approveDispatch,
  dispatchItem,
  returnItem,
  getAllDispatches,
  approveReturn,
};
