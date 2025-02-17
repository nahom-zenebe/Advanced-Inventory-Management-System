const ActivityLog = require("../models/ActivityLogmodel");

const logActivity = async ({ action, description, entity, entityId, userId, ipAddress }) => {
  try {
    const newActivity = new ActivityLog({
      action,
      description,
      entity,
      entityId,
      userId,
      ipAddress,
    });

    await newActivity.save();
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

module.exports = logActivity;
