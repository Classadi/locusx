import * as jwt from "jsonwebtoken"; // ✅ Safely imports all functions

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
