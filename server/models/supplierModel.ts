import mongoose, { Schema, Document } from "mongoose";

export interface SupplierInfo extends Document {
  sid?: string;
  name?: string;
  mobileNumber?: string;
  email?: string;
  address?: string;
}

const supplierSchema = new Schema<SupplierInfo>(
  {
    sid: { type: String },
    name: { type: String },
    mobileNumber: { type: String },
    email: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

supplierSchema.pre<SupplierInfo>("save", async function (next) {
  if (!this.sid) {
    const count = await Supplier.countDocuments();
    this.sid = `FPCSID-${(count + 1).toString().padStart(4, "0")}`;
  }
  next();
});

const Supplier = mongoose.model<SupplierInfo>("Supplier", supplierSchema);
export default Supplier;
