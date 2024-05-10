import { Request, Response, NextFunction } from "express";
import Unit,{UnitInfo} from '../models/unitModel'
const createUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUnit = new Unit(req.body);

    await newUnit.save();

    res.status(201).json({ message: "Unit saved successfully", newUnit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUnitById = async (req: Request, res: Response): Promise<void> => {
  try {
    const unit = await Unit.findById(req.params.id);
    if (!Unit) {
      res.status(404).json({ error: "Unit not found" });
      return;
    }
    console.log("Fetched Data:", Unit);
    res.status(200).json(Unit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUnits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Units = await Unit.find();
    res.status(200).json(Units);
  } catch (err) {
    next(err);
  }
};

const updateUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Updating Unit");
    const unit = await Unit.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (unit) {
      await unit.save();
      res.status(200).json({ message: "Unit updated successfully", Unit });
    } else {
      res.status(404).json({ error: "Unit not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUnit = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUnit = await Unit.findByIdAndDelete(req.params.id);
    if (!deletedUnit) {
      res.status(404).json({ error: "Unit not found" });
      return;
    }
    res.status(200).json({
      message: "Unit deleted successfully",
      deletedUnit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createUnit, updateUnit, deleteUnit, getAllUnits, getUnitById };
