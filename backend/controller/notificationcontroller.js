const Notification = require("../models/Notificationmodel");

module.exports.createNotification = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ success: false, message: "Name and type are required." });
    }

    const notification = new Notification({ name, type });
    await notification.save();



    const io=req.app.get("io")

    io.emit("newNotification",notification)
   



    res.status(201).json({ success: true, message: "Notification created successfully.", notification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating notification.", error });
  }
};


module.exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications );
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications.", error });
  }
};


module.exports.getUnreadNotifications = async (req, res) => {
  try {
    const unreadNotifications = await Notification.find({ read: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, unreadNotifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching unread notifications.", error });
  }
};


module.exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found." });
    }

    res.status(200).json({ success: true, message: "Notification marked as read.", notification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating notification.", error });
  }
};


module.exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found." });
    }

    res.status(200).json({ success: true, message: "Notification deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting notification.", error });
  }
};
