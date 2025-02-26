const express = require("express");
const router = express.Router();

const ActivityLog = require("../models/ActivityLogmodel");

module.exports = (app) => {
  const io = app.get("io");

  if (!io) {
    console.error("Socket.IO is not initialized! Make sure `app.set('io', io)` is called.");
    return router;
  }

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

 
  const emitNewLog = async (logId) => {
    const log = await ActivityLog.findById(logId).populate("userId").select("-password");
    io.emit("newActivityLog", log); 
  };

  
  router.post('/addLog', async (req, res) => {
    try {
      const newLog = new ActivityLog(req.body);
      const savedLog = await newLog.save();
      console.log("Saved log:", savedLog);
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

  router.get('/getLogs/:userid', async (req, res) => {
    const { userid } = req.params;  
    try {
      const logs = await ActivityLog.find({ userId: userid });
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch logs", error });
    }
  });
  




  router.delete('/deleteLog', async (req, res) => {
    try {
        const { id } = req.body; 

      
        const deletedLog = await ActivityLog.findByIdAndDelete(id);

        if (!deletedLog) {
            return res.status(404).json({ message: "Log not found" });
        }


        res.status(200).json({ message: "Log deleted successfully", deletedLog });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete log", error: error.message });
    }
});




  return router;
};