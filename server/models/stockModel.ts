import mongoose, { Schema, Document } from "mongoose";

export interface StockInfo extends Document {
  stockId?: string;
  productId?: string;
  uniqueProductIds?: string[];
  productName?: string;
  category?: string;
  unit?: string;
  models?: string;
  brand?: string;
  supplier?: string;
  inQty?: number;
  outQty?: number;
  stock?: number;
}

const stockSchema = new Schema<StockInfo>(
  {
    stockId: { type: String },
    productId: { type: String },
    uniqueProductIds: [{ type: String }],
    productName: { type: String },
    category: { type: String },
    unit: { type: String },
    models: { type: String },
    brand: { type: String },
    supplier: { type: String },
    inQty: { type: Number },
    outQty: { type: Number },
    stock: { type: Number }
  },
  { timestamps: true }
);

const Stock = mongoose.model<StockInfo>("Stock", stockSchema);
export default Stock;
