const { createOrder } = require("../controller/orderController");

describe("order controller", () => {
  test("requires a user before creating an order", async () => {
    const request = { body: {} };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createOrder(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: "User ID is required" });
  });
});