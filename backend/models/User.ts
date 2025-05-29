// backend/models/User.ts

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["vendor", "customer", "delivery"],
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
