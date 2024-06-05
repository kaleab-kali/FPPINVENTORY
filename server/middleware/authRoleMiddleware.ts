// authRoleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const checkRole = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  // Check for invalid user token
  console.log(req.invStaff.role);
  if (!req.invStaff.role) {
    return res.status(401).send('Not Authorized for users');
  }
  const { role } = req.invStaff;
  // Admins are allowed to continue
  if (role === 'admin') {
    return next();
  }
  // Inventory Managers can create staff
  if (role === 'invmanager' && req.body.role === 'personnel') {
    return next();
  }
  // Other roles are not allowed
  return res.status(401).send('Not Authorized');
};

export default checkRole;
