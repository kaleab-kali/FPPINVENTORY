import mongoose from "mongoose";
import colors from "colors";

const connectDb = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB connected successfully on: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    console.log(`Error: ${"error".yellow}${error}`);
    process.exit(1);
  }
};

export default connectDb;



// import mongoose from "mongoose";

// const connections: { [key: string]: mongoose.Connection } = {};

// const connectDb = async (): Promise<void> => {
//   try {
//     // Connect to the inventory database
//     const inventoryConn = await mongoose.createConnection(process.env.MONGODB_URI as string);
//     connections['inventory'] = inventoryConn;
//     console.log(`MongoDB connected successfully to Inventory database: ${inventoryConn.host}`);

//     // Connect to the PMS database
//     const pmsConn = await mongoose.createConnection(process.env.MONGODB_URI2 as string);
//     connections['pms'] = pmsConn;
//     console.log(`MongoDB connected successfully to PMS database: ${pmsConn.host}`);
//   } catch (error) {
//     console.error(`Error connecting to databases: ${error}`);
//     process.exit(1);
//   }
// };

// const getDbConnection = (dbName: string): mongoose.Connection | undefined => {
//   return connections[dbName];
// };

// export { connectDb, getDbConnection };
