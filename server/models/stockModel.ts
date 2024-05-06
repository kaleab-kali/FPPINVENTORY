import mongoose, { Schema, Document } from "mongoose";

export interface StockInfo extends Document {
  stockId?: string;
  productName?: string;
  category?: string;
  unit?: string;
  supplier?: string;
  inQty?: number;
  outQty?: number;
  stock?:number;
}

const stockSchema = new Schema<StockInfo>(
  {
    stockId: { type: String },
    productName: { type: String },
    category: { type: String },
    unit: { type: String },
    supplier: { type: String },
    
  },
  { timestamps: true }
);

const Stock = mongoose.model<StockInfo>("Stock", stockSchema);
export default Stock;
