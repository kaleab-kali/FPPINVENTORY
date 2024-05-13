import mongoose, { Document, Schema } from "mongoose";
import connectSecondaryDB from "../config/db2";
import dotenv from "dotenv";
dotenv.config();

interface Education {
  graduationYear: string;
  fieldOfStudy: string;
  universityName: string;
}

const educationSchema = new Schema<Education>({
  graduationYear: { type: String },
  fieldOfStudy: { type: String },
  universityName: { type: String },
});

interface Education2 {
  bachelor: Education[];
  master: Education[];
  phd: Education[];
}

const education2Schema = new Schema<Education2>({
  bachelor: [educationSchema],
  master: [educationSchema],
  phd: [educationSchema],
});

interface RankChange {
  oldRank?: string;
  newRank?: string;
  date?: Date;
}

interface PhoneNumber {
  prefix: string;
  number: string;
}

interface Address {
  region?: string;
  subcity?: string;
  woreda?: string;
  houseNumber?: string;
  leyuBota?: string;
}

interface BirthplaceInfo extends Address {}

interface MotherInformation {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: PhoneNumber;
}

interface EmergencyContactInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
}

interface EmergencyContactAddress extends Address {}

interface EmergencyContact {
  info: EmergencyContactInfo;
  address: EmergencyContactAddress;
}

interface SpouseInfo {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: Date;
  phoneNumber?: string;
  address?: Address;
}

interface DivorcedInfo {
  divorceDate?: Date;
}

//! leave info
interface LeaveInfo {
  employeeId?: string;
  from?: Date;
  to?: Date;
  leaveType?: string;
  reason?: string;
  status?: string;
  leaveBalance?: {
    year: string;
    leaveTypes: {
      annual: {
        credit: number;
        used: number;
        available: number;
      };
      health: {
        credit: number;
        used: number;
        available: number;
      };
      study: {
        credit: number;
        used: number;
        available: number;
      };
      maternity: {
        credit: number;
        used: number;
        available: number;
      };
      family: {
        credit: number;
        used: number;
        available: number;
      };
      paternity: {
        credit: number;
        used: number;
        available: number;
      };
      unpaid: {
        used: number;
      };
    };
    name?: string;
    email?: string;
  };
}

interface AppraisalHistory {
  employeeId?: string;
  currentLevel?: string;
  nextLevel?: string;
  scores?: {
    education?: number;
    service?: number;
    attitude?: number;
    behaviour?: number;
    workEfficiency?: number;
    disciplinary?: number;
  };
  totalScore?: number;
  status?: string;
  promotionDate?: Date;
}

interface Evaluation {
  employeeId: string;
  workQuality: number;
  productivity: number;
  communication: number;
  collaboration: number;
  punctuality: number;
  evaluationYear: number;
  total: number;
}
interface IAttendance {
  employeeId: string;
  date: Date;
  status: "late" | "on time" | "absent";
  recordedTime: Date;
  checkOutTime?: Date;
}
export interface EmployeeDocument extends Document {
  title: string;
  empId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: Date;
  gender: string;
  position: string;
  department: string;
  photo?: string;
  ethnicity: string;
  phoneNumber: PhoneNumber;
  email: string;
  currentAddress: Address;
  salary: string;
  educationLevel: string;
  education: Education2;
  birthplaceInfo: BirthplaceInfo;
  motherInformation: MotherInformation;
  emergencyContact: EmergencyContact;
  maritalStatus: string;
  spouseInfo?: SpouseInfo;
  divorcedInfo?: DivorcedInfo;
  leaveInfo?: LeaveInfo;
  appraisalHistory: AppraisalHistory[];
  evaluations: Evaluation[];
  employmentDate?: Date;
  rankChanges: RankChange[];
  waitingPeriodUntil?: Date;
  attendanceRecords: IAttendance[];
}

const rankChangeSchema = new Schema<RankChange>({
  oldRank: { type: String },
  newRank: { type: String },
  date: { type: Date, default: Date.now },
});

const evaluationSchema = new Schema<Evaluation>({
  employeeId: { type: String, required: true },
  workQuality: { type: Number, required: true },
  productivity: { type: Number, required: true },
  communication: { type: Number, required: true },
  collaboration: { type: Number, required: true },
  punctuality: { type: Number, required: true },
  evaluationYear: { type: Number },
  total: { type: Number },
});

const employeeSchema = new Schema<EmployeeDocument>(
  {
    title: { type: String, required: true },
    empId: { type: String },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    photo: { type: String },
    ethnicity: { type: String, required: true },
    phoneNumber: {
      prefix: { type: String, required: true },
      number: { type: String, required: true },
    },
    email: { type: String, required: true },
    currentAddress: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
      camp: { type: String },
    },
    salary: { type: String, required: true },
    educationLevel: { type: String, required: true },
    education: education2Schema,
    birthplaceInfo: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
    },
    motherInformation: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
      phoneNumber: {
        prefix: { type: String, required: true },
        number: { type: String, required: true },
      },
    },
    emergencyContact: {
      info: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        relationship: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String },
      },
      address: {
        region: { type: String },
        subcity: { type: String },
        woreda: { type: String },
        houseNumber: { type: String },
        leyuBota: { type: String },
      },
    },
    maritalStatus: { type: String, required: true },
    spouseInfo: {
      firstName: { type: String },
      middleName: { type: String },
      lastName: { type: String },
      dob: { type: Date },
      phoneNumber: { type: String },
      address: {
        region: { type: String },
        subcity: { type: String },
        woreda: { type: String },
        houseNumber: { type: String },
        leyuBota: { type: String },
      },
    },
    divorcedInfo: {
      divorceDate: { type: Date },
    },
    leaveInfo: {
      employeeId: { type: String },
      from: { type: Date },
      to: { type: Date },
      leaveType: { type: String },
      reason: { type: String },
      status: { type: String },
      leaveBalance: {
        year: String,
        leaveTypes: {
          annual: {
            credit: { type: Number, default: 14 },
            used: { type: Number, default: 0 },
            available: { type: Number, default: 14 },
          },
          health: {
            credit: { type: Number, default: 0 },
            used: { type: Number, default: 0 },
            available: { type: Number, default: 0 },
          },
          study: {
            credit: { type: Number, default: 0 },
            used: { type: Number, default: 0 },
            available: { type: Number, default: 0 },
          },
          maternity: {
            credit: { type: Number, default: 0 },
            used: { type: Number, default: 0 },
            available: { type: Number, default: 0 },
          },
          family: {
            credit: { type: Number, default: 0 },
            used: { type: Number, default: 0 },
            available: { type: Number, default: 0 },
          },
          paternity: {
            credit: { type: Number, default: 0 },
            used: { type: Number, default: 0 },
            available: { type: Number, default: 0 },
          },
          unpaid: {
            used: { type: Number, default: 0 },
          },
        },
        name: String,
        email: String,
      },
    },
    appraisalHistory: [
      {
        employeeId: { type: String },
        currentLevel: { type: String },
        nextLevel: { type: String },
        scores: {
          education: { type: Number },
          service: { type: Number },
          attitude: { type: Number },
          behaviour: { type: Number },
          workEfficiency: { type: Number },
          disciplinary: { type: Number },
        },
        totalScore: { type: Number },
        status: { type: String },
        promotionDate: { type: Date },
      },
    ],
    employmentDate: { type: Date, required: true },
    rankChanges: [rankChangeSchema],
    waitingPeriodUntil: { type: Date },
    evaluations: [evaluationSchema],
    attendanceRecords: [
      {
        date: { type: Date, required: true },
        status: {
          type: String,
          enum: ["late", "on time", "absent"],
          required: true,
        },
        recordedTime: { type: Date, required: true },
        checkOutTime: { type: Date },
      },
    ],
  },
  { timestamps: true }
);


const db = connectSecondaryDB(process.env.MONGODB_URI_EMPLOYEE, {
  // (optional) connection options
});
employeeSchema.pre<EmployeeDocument>("save", async function (next) {
  if (!this.empId) {
    const count = await Employee.countDocuments();
    this.empId = `FPC-${(count + 1).toString().padStart(4, "0")}`;
  }
  next();
});

const Employee = db.model("Employee", employeeSchema);
export default Employee;
