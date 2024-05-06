import mongoose, { Schema, Document } from "mongoose";

export interface CategoryInfo extends Document {
  id?: string;
  categoryName?: string;
  unit?: string;
}

const categorySchema = new Schema<CategoryInfo>(
  {
    id: { type: String },
    categoryName: { type: String },
    unit: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model<CategoryInfo>("Category", categorySchema);
export default Category;
