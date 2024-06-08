import mongoose, { Schema, Document } from "mongoose";

export interface UniqueItemInfo extends Document {
  uniqueId: string;
  productId: string;
  status: string;
  employeeId?: string;
  dispatchDate?: Date;
  returnDate?: Date;
  approvalStatus?: string;
  condition?: string;
}

const uniqueItemSchema = new Schema<UniqueItemInfo>(
  {
    uniqueId: { type: String, required: true, unique: true },
    productId: { type: String, required: true },
    status: { type: String, enum: ['in_stock', 'dispatched', 'returned'], default: 'in_stock' },
    employeeId: { type: String, default: null },
    dispatchDate: { type: Date, default: null },
    returnDate: { type: Date, default: null },
    approvalStatus: { type: String },
    condition: {type: String},
  },
  { timestamps: true }
);

const UniqueItem = mongoose.model<UniqueItemInfo>("UniqueItem", uniqueItemSchema);
export default UniqueItem;