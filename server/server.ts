import express from "express";
import colors from "colors";
import path from 'path';
import itemRoute from "./routes/itemRoutes"; 
import purchaseRoute from "./routes/purchaseRoutes"; 
import dispatchRoute from "./routes/dispatchRoutes";
import uniqueItemRoute from "./routes/uniqueItemRoutes";
import supplierRoute from "./routes/supplierRoute";
import unitRoute from "./routes/unitRoute";
import categoryRoute from "./routes/categoryRoute";
import stockRoute from "./routes/stockRoute"; 
import profileRoute from "./routes/profileRoutes";
import connectDb from "./config/db";
import dotenv from "dotenv";
import cors from  "cors";
import employeeRoute from "./routes/employeeRoute";
import invstaffRoute from "./routes/inventoryStaffRoutes";
import notificationsRouter from './routes/notificationRoutes';
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

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
connectDb();

app.use("/items", itemRoute);
app.use("/purchase", purchaseRoute);
app.use("/dispatch", dispatchRoute);
app.use("/uniqueItem", uniqueItemRoute);
app.use("/inventoryAssignment", itemRoute);
app.use("/supplier", supplierRoute);
app.use("/units", unitRoute);
app.use("/category", categoryRoute);
app.use("/stock", stockRoute);
app.use("/employee", employeeRoute);
app.use("/invstaff", invstaffRoute );
app.use("/profile", profileRoute);
app.use('/notifications', notificationsRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
