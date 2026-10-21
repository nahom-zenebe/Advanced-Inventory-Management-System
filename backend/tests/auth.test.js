jest.mock("../models/Usermodel", () => ({
  findOne: jest.fn(),
}));

const User = require("../models/Usermodel");
const { login } = require("../controller/authcontroller");

describe("auth controller", () => {
  test("returns an error when logging in with an unknown user", async () => {
    User.findOne.mockResolvedValue(null);

    const request = {
      body: { email: "missing@example.com", password: "password" },
      ip: "127.0.0.1",
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ error: "No user found" });
  });
});