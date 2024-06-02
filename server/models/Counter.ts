import mongoose, { Schema, Document } from "mongoose";

interface CounterModel extends Document {
  _id: string;
  seq: number;
}

const counterSchema = new Schema<CounterModel>(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
  }
);

const Counter = mongoose.model<CounterModel>("Counter", counterSchema);

export default Counter;
