import { Request, Response, NextFunction } from "express";
import Supplier,{SupplierInfo} from '../models/supplierModel'
const createSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSupplier = new Supplier(req.body);

    await newSupplier.save();

    res.status(201).json({ message: "Supplier saved successfully", newSupplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  console.log("Fetching Supplier");
  try {
    const supplier = await Supplier.findOne({ sid: req.params.id });
    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }
    console.log("Fetched Data:", supplier);
    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllSuppliers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Suppliers = await Supplier.find();
    res.status(200).json(Suppliers);
  } catch (err) {
    next(err);
  }
};

const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Updating Supplier");
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (supplier) {
      await supplier.save();
      res.status(200).json({ message: "Supplier updated successfully", Supplier });
    } else {
      res.status(404).json({ error: "Supplier not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }
    res.status(200).json({
      message: "Supplier deleted successfully",
      deletedSupplier,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createSupplier, updateSupplier, deleteSupplier, getAllSuppliers, getSupplierById };
