jest.mock("../models/Notificationmodel", () => {
  const Notification = jest.fn().mockImplementation((data) => ({
    ...data,
    save: jest.fn().mockResolvedValue(),
  }));

  Notification.find = jest.fn();
  Notification.findByIdAndUpdate = jest.fn();
  Notification.findByIdAndDelete = jest.fn();

  return Notification;
});

const Notification = require("../models/Notificationmodel");
const {
  createNotification,
  getAllNotifications,
  getUnreadNotifications,
  markAsRead,
  deleteNotification,
} = require("../controller/notificationcontroller");

const createResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

describe("notification controller", () => {
  beforeEach(() => jest.clearAllMocks());

  test("requires a notification name and type", async () => {
    const response = createResponse();

    await createNotification({ body: {} }, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: "Name and type are required.",
    });
  });

  test("creates a notification and emits it through Socket.IO", async () => {
    const response = createResponse();
    const emit = jest.fn();
    const request = {
      body: { name: "Low stock", type: "inventory" },
      app: { get: jest.fn().mockReturnValue({ emit }) },
    };

    await createNotification(request, response);

    expect(Notification).toHaveBeenCalledWith(request.body);
    expect(emit).toHaveBeenCalledWith(
      "newNotification",
      expect.objectContaining(request.body),
    );
    expect(response.status).toHaveBeenCalledWith(201);
  });

  test("returns unread notifications", async () => {
    const response = createResponse();
    const notifications = [{ name: "Low stock", read: false }];
    Notification.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(notifications),
    });

    await getUnreadNotifications({}, response);

    expect(Notification.find).toHaveBeenCalledWith({ read: false });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      unreadNotifications: notifications,
    });
  });

  test("returns not found when marking an unknown notification", async () => {
    const response = createResponse();
    Notification.findByIdAndUpdate.mockResolvedValue(null);

    await markAsRead({ params: { id: "missing" } }, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: "Notification not found.",
    });
  });

  test("deletes an existing notification", async () => {
    const response = createResponse();
    Notification.findByIdAndDelete.mockResolvedValue({ _id: "notification-1" });

    await deleteNotification({ params: { id: "notification-1" } }, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      message: "Notification deleted successfully.",
    });
  });
});
