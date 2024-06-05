import express, { Router } from "express";
import {
  getAllStocks,

} from "../controllers/stockController";
import authAdminProtect from '../middleware/authAdminMiddleware';

const router: Router = express.Router();


router.get("/", authAdminProtect, getAllStocks);


export default router;
