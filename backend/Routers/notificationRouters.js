const express = require("express");
const router = express.Router();
const NotificationController = require("../controller/notificationcontroller");

router.post("/createNotification", NotificationController.createNotification); 
router.get("/allNotification ", NotificationController.getAllNotifications); 
router.get("/unreadNotification", NotificationController.getUnreadNotifications); 
router.put("/:id/readNotification", NotificationController.markAsRead); 
router.delete("/:id/deleteNotification", NotificationController.deleteNotification); 

module.exports = router;
