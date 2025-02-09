const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["create", "update", "delete", "login", "logout", "stock-change", "order-status"],
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, 
    },
    entity: {
      type: String,
      required: true,
      enum: ["product", "category", "order", "user", "system"], 
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, 
    },
    ipAddress: {
        type: String,
        required: false,
      },
    
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", ActivityLogSchema);

module.exports = ActivityLog;
