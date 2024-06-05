import express from 'express';
import { getProfile } from '../controllers/profileController';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorization';

const router = express.Router();

router.get('/', authenticate, authorize, getProfile);

export default router;
