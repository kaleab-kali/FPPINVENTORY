import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import itemRoute from "./routes/itemRoutes";
import connectDb from "./config/db";

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
app.use("/inventoryAssignment", itemRoute);
app.use("/uploads", express.static("uploads"));
const uploadsFolder = path.join(__dirname, "./uploads/");
console.log("Creating a photo-0 ");

if (!fs.existsSync(uploadsFolder)) {
  console.log("Creating a photo0 ");
  fs.mkdirSync(uploadsFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Creating a photo1 " + file.originalname);
    cb(null, uploadsFolder);
  },
  filename: (req, file, cb) => {
    console.log("Creating a photo 2" + file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
const fileupload = upload.single("photo");

app.post("/uploads", fileupload, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const filePath = path.join(uploadsFolder, req.file.filename);

    res.json({
      message: "File uploaded successfully.",
      filePath: filePath,
      fileName: req.file.filename,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: "File upload error: " + err.message });
    } else {
      next(err);
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
