import mongoose, { Schema, Document } from "mongoose";
//category
export interface Category extends Document {
  categoryId?: string;
  name?: string;
}
const categorySchema = new Schema<Category>(
  {
    categoryId: { type: String },
    name: { type: String },
  },
  { _id: false }
);


// inventory movement
// export interface InventoryMovement extends Document {
//   movementId?: string;
//   itemId?: string;
//   quantity?: number;
// }
// const inventoryMovementSchema = new Schema<InventoryMovement>(
//   {
//     movementId: { type: String },
//     itemId: { type: String },
//     quantity: { type: Number },
//   },
//   { _id: false }
// );
// // item info Info Schema
export interface ItemInfo extends Document {
  // itemId?: InventoryMovement;
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  categoryId?: string;

}

const itemSchema = new Schema<ItemInfo>(
  {
    // itemId:inventoryMovementSchema,
    name: { type: String },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    categoryId: { type: String },
  },
  { timestamps: true }
);

const Item = mongoose.model<ItemInfo>("Item", itemSchema);
export default Item;
