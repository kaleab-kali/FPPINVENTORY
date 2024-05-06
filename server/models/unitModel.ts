import mongoose, { Schema, Document } from "mongoose";

export interface UnitInfo extends Document {
  id?: string;
  unitName?: string;
  standard?: string;
}

const unitSchema = new Schema<UnitInfo>(
  {
    id: { type: String },
    unitName: { type: String },
    standard: { type: String },
  },
  { timestamps: true }
);

const Unit = mongoose.model<UnitInfo>("Unit", unitSchema);
export default Unit;
