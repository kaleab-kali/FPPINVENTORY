import mongoose, { Schema, Document } from "mongoose";
export interface ItemInfo extends Document {
  name?: string;
  models?: string;
  brand?: string;
  supplier?: string;
  unit?: string;
  manufactureDate?: Date;
  expirationDate?: Date;
  quantity?: number;
  weightDimension?: number;
  unitPrice?: number;
  category?: string;
  returnable?: boolean;
}

const itemSchema = new Schema<ItemInfo>(
  {
    name: { type: String },
    models: { type: String },
    brand: { type: String },
    supplier: { type: String },
    unit: { type: String },
    manufactureDate: { type: Date },
    expirationDate: { type: Date },
    quantity: { type: Number },
    unitPrice: { type: Number },
    category: { type: String },
    returnable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Item = mongoose.model<ItemInfo>("Item", itemSchema);
export default Item;
