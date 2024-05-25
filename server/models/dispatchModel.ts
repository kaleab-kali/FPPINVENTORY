import mongoose, { Schema, Document } from "mongoose";

export interface DispatchInfo extends Document {
  employeeId: string;
  dispatchId: string;
  employeeFullName: string;
  issueDate: Date;
  expectedReturnDate?: Date;
  productId: string;
  productName: string;
  itemCategory: string;
  quantity: number;
  purpose: string;
  remarks: string;
}

const dispatchSchema = new Schema<DispatchInfo>(
  {
    employeeId: { type: String, required: true },
    dispatchId: { type: String },
    employeeFullName: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expectedReturnDate: { type: Date },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    itemCategory: { type: String, required: true },
    quantity: { type: Number, required: true },
    purpose: { type: String, required: true },
    remarks: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

dispatchSchema.pre<DispatchInfo>("save", async function (next) {
  if (!this.dispatchId) {
    const lastDispatch = await Dispatch.findOne({}, {}, { sort: { createdAt: -1 } });
    let lastDispatchIdNumber = 0;
    if (lastDispatch && lastDispatch.dispatchId) {
      lastDispatchIdNumber = parseInt(lastDispatch.dispatchId.split("-")[1]);
    }
    this.dispatchId = `DISPATCH-${(lastDispatchIdNumber + 1).toString().padStart(4, "0")}`;
  }
  next();
});

const Dispatch = mongoose.model<DispatchInfo>("Dispatch", dispatchSchema);
export default Dispatch;