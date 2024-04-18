import express from "express";
import colors from "colors";
import itemRoute from "./routes/itemRoutes"; 
import connectDb from "./config/db";
import dotenv from "dotenv";
// import cors from  "cors";

// Extend the String interface with 'colors' properties
declare module "colors" {
  interface String {
    cyan: String;
  }
}

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors({ origin: "http://localhost:3000" }));

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
connectDb();

app.use("/items", itemRoute);
app.use("/inventoryAssignment", itemRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
