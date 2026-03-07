import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


export const auth = (req: Request, res: Response, next: NextFunction) => {

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

  const user = req?.user;

  console.log('user roler from middle ware',req.user)

  if (!user || user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};