const express = require("express");
const router = express.Router();
const {createNotification,getAllNotifications,getUnreadNotifications,markAsRead,deleteNotification}= require("../controller/notificationcontroller");

router.post("/createNotification",createNotification); 
router.get("/allNotification", getAllNotifications); 
router.get("/unreadNotification", getUnreadNotifications); 
router.put("/:id/readNotification", markAsRead); 
router.delete("/deleteNotification/:id/", deleteNotification); 

module.exports = router;
