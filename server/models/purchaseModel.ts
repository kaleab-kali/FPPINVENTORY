import mongoose, { Schema, Document } from "mongoose";
import UniqueItem from "./uniqueItemModel"; // Import the unique item schema
import Stock from "./stockModel";
import { v4 as uuidv4 } from "uuid";

export interface PurchaseInfo extends Document {
  productName?: string;
  productId?: string;
  models?: string;
  brand?: string;
  supplier?: string;
  unit?: string;
  manufactureDate?: Date;
  expirationDate?: Date;
  quantity?: number;
  weightDimension?: number;
  unitPrice?: number;
  totalPrice?: number;
  category?: string;
  description?: string;
  purchaseDate?: Date;
  purchaseID?: string;
  status?: string;
}

const purchaseSchema = new Schema<PurchaseInfo>(
  {
    productName: { type: String },
    productId: { type: String },
    models: { type: String },
    brand: { type: String },
    supplier: { type: String },
    unit: { type: String },
    manufactureDate: { type: Date },
    expirationDate: { type: Date },
    quantity: { type: Number },
    unitPrice: { type: Number },
    totalPrice: { type: Number },
    category: { type: String },
    description: { type: String },
    purchaseDate: { type: Date },
    purchaseID: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

purchaseSchema.pre<PurchaseInfo>("save", async function (next) {
  if (!this.purchaseID) {
    const lastItem = await Purchase.findOne({}, {}, { sort: { createdAt: -1 } });
    const lastPurchaseId = lastItem && lastItem.purchaseID ? parseInt(lastItem.purchaseID.split("-")[1]) : 0;
    const newPurchaseId = `FPCPUR-${(lastPurchaseId + 1).toString().padStart(4, "0")}`;
    this.purchaseID = newPurchaseId;
  }

  next();
});

purchaseSchema.post<PurchaseInfo>("save", async function (doc, next) {
  // Perform updates only if the purchase status is 'approved'
  if (doc.status === 'approved') {
    if (doc.quantity && doc.quantity > 0) {
      const uniqueProductIds: string[] = [];
      for (let i = 0; i < doc.quantity; i++) {
        const uniqueId = uuidv4();
        uniqueProductIds.push(uniqueId);
        const uniqueItem = new UniqueItem({
          uniqueId: uniqueId,
          productId: doc.productId,
          status: 'in_stock'
        });
        await uniqueItem.save();
      }

      const stockItem = await Stock.findOne({ productId: doc.productId });
      if (stockItem) {
        stockItem.inQty = (stockItem.inQty || 0) + doc.quantity;
        stockItem.stock = (stockItem.stock || 0) + doc.quantity;
        stockItem.uniqueProductIds = [...(stockItem.uniqueProductIds || []), ...uniqueProductIds];
        await stockItem.save();
      } else {
        const newStockItem = new Stock({
          productId: doc.productId,
          uniqueProductIds: uniqueProductIds,
          productName: doc.productName,
          category: doc.category,
          unit: doc.unit,
          models: doc.models,
          brand: doc.brand,
          supplier: doc.supplier,
          inQty: doc.quantity,
          outQty: 0,
          stock: doc.quantity
        });
        await newStockItem.save();
      }
    }
  }

  next();
});

const Purchase = mongoose.model<PurchaseInfo>("Purchase", purchaseSchema);
export default Purchase;
