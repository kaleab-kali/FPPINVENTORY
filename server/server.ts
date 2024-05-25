import express from "express";
import colors from "colors";
import itemRoute from "./routes/itemRoutes"; 
import purchaseRoute from "./routes/purchaseRoutes"; 
import dispatchRoute from "./routes/dispatchRoutes";
import supplierRoute from "./routes/supplierRoute";
import unitRoute from "./routes/unitRoute";
import categoryRoute from "./routes/categoryRoute";
import stockRoute from "./routes/stockRoute"; 
import connectDb from "./config/db";
import dotenv from "dotenv";
import cors from  "cors";
import employeeRoute from "./routes/employeeRoute"
declare module "colors" {
  interface String {
    cyan: String;
  }
}

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
connectDb();

app.use("/items", itemRoute);
app.use("/purchase", purchaseRoute);
app.use("/dispatch", dispatchRoute);
app.use("/inventoryAssignment", itemRoute);
app.use("/supplier", supplierRoute);
app.use("/units", unitRoute);
app.use("/category", categoryRoute);
app.use("/stock", stockRoute);
app.use("/employee", employeeRoute);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
