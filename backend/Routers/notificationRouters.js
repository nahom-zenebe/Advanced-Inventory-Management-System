const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/notificationcontroller");

router.post("/", NotificationController.createNotification); 
router.get("/", NotificationController.getAllNotifications); 
router.get("/unread", NotificationController.getUnreadNotifications); 
router.put("/:id/read", NotificationController.markAsRead); 
router.delete("/:id", NotificationController.deleteNotification); 

module.exports = router;
