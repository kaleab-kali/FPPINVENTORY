import mongoose, { Schema, Document } from "mongoose";

export interface UnitInfo extends Document {
  unitID?: string;
  unitName?: string;
  standard?: string;
}

const unitSchema = new Schema<UnitInfo>(
  {
    unitID: { type: String },
    unitName: { type: String },
    standard: { type: String },
  },
  { timestamps: true }
);

unitSchema.pre<UnitInfo>("save", async function (next) {
  if (!this.unitID) {
    const lastUnit = await Unit.findOne({}, {}, { sort: { createdAt: -1 } });
    let lastunitIDNumber = 0;
    if (lastUnit && lastUnit.unitID) {
      lastunitIDNumber = parseInt(lastUnit.unitID.split("-")[1]);
    }
    this.unitID = `UNIT-${(lastunitIDNumber + 1).toString().padStart(4, "0")}`;
  }
  next();
});

const Unit = mongoose.model<UnitInfo>("Unit", unitSchema);
export default Unit;
