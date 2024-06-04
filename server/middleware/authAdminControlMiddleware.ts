// authRoleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const checkAdminRole = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
  // Check for invalid user token
  if (!req.invStaff.role) {
    return res.status(401).send('Not Authorized for users');
  }
  const { role } = req.invStaff;
  // Admins are allowed to continue
  if (role === 'admin') {
    return next();
  }
  // Other roles are not allowed
  return res.status(401).send('Not Authorized');
};

export default checkAdminRole;
