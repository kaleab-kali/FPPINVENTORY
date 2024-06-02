import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import INVStaff from '../models/inventoryStaffModel';

declare global {
  namespace Express {
    interface Request {
        invStaff?: any; // Define Invetory Staff property on Request object
    }
  }
}

const authAdminProtect = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  let token;
  let invStaff;
  let decoded: jwt.JwtPayload | null = null; // Initialize decoded to null

  if (req.headers.authorization && req.headers.authorization.trim().startsWith('Bearer')) {
    try {
      // Get Token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      // Get Invetory Staff from Token
      invStaff = await INVStaff.findById(decoded.id);
      if (!invStaff) {
        return res.status(401).send('Not Authorized with invalid token');
      }
      // Pass Invetory Staff object to next middleware
      req.invStaff = invStaff;
      next();
    } catch (error) {
      if (!decoded || !(await INVStaff.findById(decoded.id))) {
        return res.status(401).send('Not Authorized with invalid token');
      }
      return res.status(500).send('Ooops!! Something Went Wrong, Try again...');
    }
  }
  if (!token) {
    return res.status(401).send('Not Authorized without token');
  }
};

export default authAdminProtect;
