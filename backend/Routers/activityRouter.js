const express = require("express");
const router = express.Router();

const ActivityLog = require("../models/ActivityLogmodel");

module.exports = (app) => {
  const io = app.get("io");

  if (!io) {
    console.error("Socket.IO is not initialized! Make sure `app.set('io', io)` is called.");
    return router; // Return an empty router instead of crashing
  }

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Emit new log event
  const emitNewLog = async (logId) => {
    const log = await ActivityLog.findById(logId).populate("userId");
    io.emit("newActivityLog", log); // Emit to all connected clients
  };

  // Create a new activity log
  router.post('/addLog', async (req, res) => {
    try {
      const newLog = new ActivityLog(req.body);
      const savedLog = await newLog.save();

      emitNewLog(savedLog._id);

      res.status(201).json(savedLog);
    } catch (error) {
      res.status(500).json({ message: "Error creating activity log", error });
    }
  });

  router.get('/getAllLogs', async (req, res) => {
    try {
      const logs = await ActivityLog.find().populate("userId");
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch logs", error });
    }
  });

  return router;
};