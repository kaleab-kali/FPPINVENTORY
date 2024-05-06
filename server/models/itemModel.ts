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
  unique_productIDs?: string[];
  productID?: string;
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
    unique_productIDs: [{ type: String }],
    productID: { type: String },
  },
  { timestamps: true }
);

itemSchema.pre<ItemInfo>("save", async function (next) {
  if (!this.productID) {
    // Generate a new product ID
    // const ItemModel = mongoose.model<ItemInfo>("Item");
    // const lastProduct = await ItemModel.findOne({}, {}, { sort: { createdAt: -1 } });

    // const lastProductId = lastProduct?.productID ? parseInt(lastProduct.productID.split("-")[1]) : 0;
    const count = await Item.countDocuments();
    const newProductId = `FPCPID-${(count + 1).toString().padStart(4, "0")}`;

    this.productID = newProductId;
  }

  if (!this.unique_productIDs || this.unique_productIDs.length !== this.quantity) {
  this.unique_productIDs = Array.from({ length: this.quantity } as any, (_, index) => `${this.productID}-${index + 1}`);}

  next();
});

const Item = mongoose.model<ItemInfo>("Item", itemSchema);
export default Item;
