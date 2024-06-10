import mongoose, { Schema, Document } from 'mongoose';

// Define roles enum
enum Roles {
  Staff = 'personnel',
  INVManager = 'invmanager',
  StockManger = 'stockmanager',
  Admin = 'admin',
}

// Define interface for Invetory Staff document
interface IinvStaff extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
  phoneNumber: string;
  employmentDate: Date;
  photo: string;
  failedLoginAttempts?: Number;
  locked?: Boolean;
  lockedUntil?: Date;
}

// Define schema for Invetory Staff
const inventoryStaffSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Roles) },
  phoneNumber: { type: String, required: true },
  employmentDate: { type: String, required: true },
  photo: { type: String },
  failedLoginAttempts: { type: Number, default: 0 },
  locked: { type: Boolean, default: false },
  lockedUntil: { type: Date },
});

// Create and export Invetory Staff model
const INVStaff = mongoose.model<IinvStaff>('INVStaff', inventoryStaffSchema);
export default INVStaff;
