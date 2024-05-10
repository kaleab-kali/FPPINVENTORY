import express, { Router } from "express";
import {
  getAllStocks,

} from "../controllers/stockController";

const router: Router = express.Router();


router.get("/", getAllStocks);


export default router;
