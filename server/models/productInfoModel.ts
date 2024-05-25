import mongoose, { Schema, Document } from "mongoose";

export interface ProductInfo extends Document {
  productName?: string;
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
  discription?: string;
  purchaseDate?: Date;
  purchaseID?: string;
  status?: string;
}

const productInfoSchema = new Schema<ProductInfo>(
  {
    productName: { type: String },
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
    discription: { type: String },
    purchaseDate: { type: Date },
    purchaseID: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

// productInfoSchema.pre<ProductInfo>("save", async function (next) {
//   if (!this.purchaseID) {
//     const lastItem = await Purchase.findOne({}, {}, { sort: { createdAt: -1 } });
//     const lastpurchaseId = lastItem && lastItem.purchaseID ? parseInt(lastItem.purchaseID.split("-")[1]) : 0;
//     const newpurchaseId = `FPCPID-${(lastpurchaseId + 1).toString().padStart(4, "0")}`;
//     this.purchaseID = newpurchaseId;
//   }

//   next();
// });

const ProductInfo = mongoose.model<ProductInfo>("ProductInfo", productInfoSchema);
export default ProductInfo;
