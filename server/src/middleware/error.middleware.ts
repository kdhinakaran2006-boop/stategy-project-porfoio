import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("[ERROR]", err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
}

import { verifyToken } from "../services/auth.service";

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
  // Bypass authentication for "remove login portal" request
  req.userId = "anonymous-user";
  next();
};
