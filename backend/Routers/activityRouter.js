const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLogmodel");

module.exports = (app) => {
  const io = app.get("io");

  if (!io) {
    console.error("Socket.IO is not initialized! Make sure app.set('io', io) is called.");
    return router;
  }

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  const emitNewLog = async (logId) => {
    try {
      const log = await ActivityLog.findById(logId).populate("userId").select("-password");
      io.emit("newActivityLog", log);
    } catch (error) {
      console.error("Error emitting new log:", error);
    }
  };

  router.post('/addLog', async (req, res) => {
    try {
      const newLog = new ActivityLog(req.body);
      const savedLog = await newLog.save();
      console.log("Saved log:", savedLog);
      emitNewLog(savedLog._id);

      res.status(201).json(savedLog);
    } catch (error) {
      console.error("Error creating activity log:", error);
      res.status(500).json({ message: "Error creating activity log", error: error.message });
    }
  });

  router.get('/getAllLogs', async (req, res) => {
    try {
      const logs = await ActivityLog.find().populate("userId");
      res.status(200).json(logs);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      res.status(500).json({ message: "Failed to fetch logs", error: error.message });
    }
  });

  
  router.get("/getrecentActivitys",async(req,res)=>{
    try{
      const logs=await ActivityLog.find().sort({createdAt: -1}).limit(3);
      res.status(200).json(logs);
    }
    catch(error){
      console.error("Failed to fetch logs:", error);
      res.status(500).json({ message: "Failed to fetch logs", error: error.message });
    
    }
  })

  router.get('/getLogs/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
      const logs = await ActivityLog.find({ userId: userid });
      res.status(200).json(logs);
    } catch (error) {
      console.error("Failed to fetch logs for user:", userid, error);
      res.status(500).json({ message: "Failed to fetch logs", error: error.message });
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
      console.error("Failed to delete log:", error);
      res.status(500).json({ message: "Failed to delete log", error: error.message });
    }
  });

  return router;
};