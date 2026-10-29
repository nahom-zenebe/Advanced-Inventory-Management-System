jest.mock("../models/Productmodel", () => {
  const Product = jest.fn().mockImplementation((data) => ({
    ...data,
    _id: "product-1",
    save: jest.fn().mockResolvedValue(),
  }));

  Product.find = jest.fn();
  Product.countDocuments = jest.fn();
  Product.findByIdAndDelete = jest.fn();
  Product.findByIdAndUpdate = jest.fn();

  return Product;
});

jest.mock("../libs/logger", () => jest.fn().mockResolvedValue());

const Product = require("../models/Productmodel");
const {
  Addproduct,
  getProduct,
  RemoveProduct,
  EditProduct,
  SearchProduct,
} = require("../controller/productController");

const createResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

describe("product controller", () => {
  beforeEach(() => jest.clearAllMocks());

  test("rejects an incomplete product", async () => {
    const response = createResponse();

    await Addproduct(
      { body: {}, user: { _id: "user-1" }, ip: "127.0.0.1" },
      response,
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: "Please provide all product details.",
    });
    expect(Product).not.toHaveBeenCalled();
  });

  test("creates a product when all details are provided", async () => {
    const response = createResponse();
    const request = {
      body: {
        name: "Keyboard",
        Desciption: "Mechanical keyboard",
        Category: "category-1",
        Price: 99,
        quantity: 5,
      },
      user: { _id: "user-1" },
      ip: "127.0.0.1",
    };

    await Addproduct(request, response);

    expect(Product).toHaveBeenCalledWith(request.body);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      message: "Product created successfully",
    });
  });

  test("returns products and the total count", async () => {
    const response = createResponse();
    const products = [{ name: "Keyboard" }];
    Product.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(products),
    });
    Product.countDocuments.mockResolvedValue(1);

    await getProduct({}, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      Products: products,
      totalProduct: 1,
    });
  });

  test("returns not found when deleting an unknown product", async () => {
    const response = createResponse();
    Product.findByIdAndDelete.mockResolvedValue(null);

    await RemoveProduct(
      {
        params: { productId: "missing" },
        user: { _id: "user-1" },
        ip: "127.0.0.1",
      },
      response,
    );

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: "Product not found!",
    });
  });

  test("requires a search query", async () => {
    const response = createResponse();

    await SearchProduct({ query: {} }, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Query parameter is required",
    });
  });

  test("rejects an invalid product update", async () => {
    const response = createResponse();

    await EditProduct(
      { body: { productId: "product-1" }, user: { _id: "user-1" } },
      response,
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid update data provided.",
    });
  });
});
