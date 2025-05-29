import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../backend/lib/dbConnect";
import mongoose from "mongoose";
import { generateToken } from "../../backend/utils/jwt";

// Generic user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Dynamic model getter
const getModelByRole = (role: string) => {
  const collectionName = role.charAt(0).toUpperCase() + role.slice(1); // e.g., 'Vendor'
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, userSchema)
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await dbConnect();

  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const UserModel = getModelByRole(role);

    // Check if user already exists

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Save user
    const newUser = await UserModel.create({ email, password, role });

    const token = generateToken({ email: newUser.email, role: newUser.role });

    return res.status(201).json({ token, role: newUser.role });
  } catch (error) {
    console.error("Registration API error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
