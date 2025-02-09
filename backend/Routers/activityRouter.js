const express = require("express");
const router = express.Router();
const ActivityLogController = require("../controller/activitycontroller");

router.post("/createactivity", ActivityLogController.createActivityLog); 
router.get("/getactivity", ActivityLogController.getAllActivityLogs); 
router.get("/entity/:entity", ActivityLogController.getActivityLogsByEntity); 
router.get("/user/:userId", ActivityLogController.getActivityLogsByUser); 
router.delete("/:id", ActivityLogController.deleteActivityLog); 

module.exports = router;
