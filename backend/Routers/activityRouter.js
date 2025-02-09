const express = require("express");
const router = express.Router();
const ActivityLogController = require("../controller/activitycontroller");

router.post("/", ActivityLogController.createActivityLog); // Create a new activity log
router.get("/", ActivityLogController.getAllActivityLogs); // Get all activity logs
router.get("/entity/:entity", ActivityLogController.getActivityLogsByEntity); // Get logs by entity type
router.get("/user/:userId", ActivityLogController.getActivityLogsByUser); // Get logs by user
router.delete("/:id", ActivityLogController.deleteActivityLog); // Delete an activity log

module.exports = router;
