// pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../backend/models/userModel";
import { generateToken } from "../../backend/utils/jwt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ email: user.email, role: user.role });

    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("Login API error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
// pages/api/login.ts--------------------------------------------------------------------------------------

// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "../../backend/lib/dbConnect";
// import User from "../../backend/models/User";
// import { generateToken } from "../../backend/utils/jwt";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   await dbConnect();

//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({ message: "Missing credentials" });
//     }

//     const user = await User.findOne({ email, password, role });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken({ email: user.email, role: user.role });

//     return res.status(200).json({ token, role: user.role });
//   } catch (error) {
//     console.error("Login API error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

//--------------------------------------------------------------------------------------

// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "../../backend/lib/dbConnect";
// import mongoose from "mongoose";
// import { generateToken } from "../../backend/utils/jwt";

// // Schema should match your registration schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true },
// });

// // Dynamically get the model based on role
// const getModelByRole = (role: string) => {
//   const modelName = role.charAt(0).toUpperCase() + role.slice(1); // e.g., Vendor
//   return mongoose.models[modelName] || mongoose.model(modelName, userSchema);
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   await dbConnect();

//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({ message: "Missing credentials" });
//     }

//     const UserModel = getModelByRole(role);
//     const user = await UserModel.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken({ email: user.email, role: user.role });

//     return res.status(200).json({ token, role: user.role });
//   } catch (error) {
//     console.error("Login API error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
