const { addOrUpdateInventory } = require("../controller/inventorycontroller");

describe("inventory controller", () => {
  test("requires a product and quantity", async () => {
    const request = { body: {} };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await addOrUpdateInventory(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: "Product and quantity are required",
    });
  });
});