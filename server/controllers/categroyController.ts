import { Request, Response, NextFunction } from "express";
import Category,{CategoryInfo} from '../models/categoryModel'
const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCategory = new Category(req.body);

    await newCategory.save();

    res.status(201).json({ message: "Category saved successfully", newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findOne({catID: req.params.id});
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    console.log("Fetched Data:", category);
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCategorys = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Categorys = await Category.find();
    res.status(200).json(Categorys);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Updating Category");
    const category = await Category.findOneAndUpdate(
      {catID: req.params.id},
      { $set: req.body },
      { new: true }
    );
    if (category) {
      await category.save();
      res.status(200).json({ message: "Category updated successfully", Category });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCategory = await Category.findOneAndDelete({catID: req.params.id});
    if (!deletedCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createCategory, updateCategory, deleteCategory, getAllCategorys, getCategoryById };
