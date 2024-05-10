import mongoose, { Schema, Document } from "mongoose";

export interface SupplierInfo extends Document {
  sid?: string;
  name?: string;
  mobileNumber?: string;
  email?: string;
  address?: string;
  status?: string;
}

const supplierSchema = new Schema<SupplierInfo>(
  {
    sid: { type: String },
    name: { type: String },
    mobileNumber: { type: String },
    email: { type: String },
    address: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

supplierSchema.pre<SupplierInfo>("save", async function (next) {
  if (!this.sid) {
    const lastSupplier = await Supplier.findOne({}, {}, { sort: { createdAt: -1 } });
    let lastSidNumber = 0;
    if (lastSupplier && lastSupplier.sid) {
      lastSidNumber = parseInt(lastSupplier.sid.split("-")[1]);
    }
    this.sid = `FPCSID-${(lastSidNumber + 1).toString().padStart(4, "0")}`;
  }
  next();
});

const Supplier = mongoose.model<SupplierInfo>("Supplier", supplierSchema);
export default Supplier;
