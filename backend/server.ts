// backend/server.ts

import express from "express";
import http from "http";
import cors from "cors";
import { initSocket } from "./socket"; // ✅ Import your Socket.IO logic

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Initialize Socket.IO
initSocket(server);

// Simple health check route
app.get("/", (req, res) => {
  res.send("Backend API running...");
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
