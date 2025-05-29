// backend/socket.ts

import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";

let io: IOServer;

export const initSocket = (server: HTTPServer) => {
  io = new IOServer(server, {
    cors: {
      origin: "*", // Use a stricter value in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-order", (orderId: string) => {
      socket.join(orderId);
      console.log(`Client ${socket.id} joined order room: ${orderId}`);
    });

    socket.on("leave-order", (orderId: string) => {
      socket.leave(orderId);
      console.log(`Client ${socket.id} left order room: ${orderId}`);
    });

    // Example: Receiving location from delivery dashboard
    socket.on("send-location", ({ orderId, location }) => {
      io.to(orderId).emit("location-update", location);
    });
  });
};
