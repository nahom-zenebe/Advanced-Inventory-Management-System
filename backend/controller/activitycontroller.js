const ActivityLog = require("../models/ActivityLogmodel");


exports.createActivityLog = async (req, res) => {
  try {
    const { action, description, entity, entityId, userId } = req.body;

    if (!action || !description || !entity || !entityId) {
      return res.status(400).json({ success: false, message: "Please provide all required details." });
    }

    const newActivity = new ActivityLog({
      action,
      description,
      userId,
      entity,
      entityId,
      ipAddress: req.ip, // Capture IP address
    });

    await newActivity.save();

    res.status(201).json({ success: true, message: "Activity log created successfully.", activity: newActivity });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating activity log.", error });
  }
};


exports.getAllActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching activity logs.", error });
  }
};


exports.getActivityLogsByEntity = async (req, res) => {
  try {
    const { entity } = req.params;

    const logs = await ActivityLog.find({ entity }).sort({ createdAt: -1 });

    if (logs.length === 0) {
      return res.status(404).json({ success: false, message: "No activity logs found for this entity." });
    }

    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching logs by entity.", error });
  }
};


exports.getActivityLogsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const logs = await ActivityLog.find({ userId }).sort({ createdAt: -1 });

    if (logs.length === 0) {
      return res.status(404).json({ success: false, message: "No activity logs found for this user." });
    }

    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching logs by user.", error });
  }
};


exports.deleteActivityLog = async (req, res) => {
  try {
    const { id } = req.params;

    const log = await ActivityLog.findByIdAndDelete(id);
    if (!log) {
      return res.status(404).json({ success: false, message: "Activity log not found." });
    }

    res.status(200).json({ success: true, message: "Activity log deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting activity log.", error });
  }
};

   