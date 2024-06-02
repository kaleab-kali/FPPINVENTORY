import mongoose, { Schema, Document } from "mongoose";

export interface ItemInfo extends Document {
  name?: string;
  models?: string;
  brand?: string;
  supplier?: string;
  unit?: string;
  category?: string;
  returnable?: boolean;
  productID?: string;
}

const itemSchema = new Schema<ItemInfo>(
  {
    name: { type: String },
    models: { type: String },
    brand: { type: String },
    supplier: { type: String },
    unit: { type: String },
    category: { type: String },
    returnable: { type: Boolean, default: false },
    productID: { type: String },
  },
  { timestamps: true }
);

itemSchema.pre<ItemInfo>("save", async function (next) {
  if (!this.productID) {
    const lastItem = await Item.findOne({}, {}, { sort: { createdAt: -1 } });
    const lastProductId = lastItem && lastItem.productID ? parseInt(lastItem.productID.split("-")[1]) : 0;
    const newProductId = `FPCPID-${(lastProductId + 1).toString().padStart(4, "0")}`;
    this.productID = newProductId;
  }
  next();
});

const Item = mongoose.model<ItemInfo>("Item", itemSchema);
export default Item;
