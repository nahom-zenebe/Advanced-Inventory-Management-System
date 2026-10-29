jest.mock("../models/StockTranscationmodel", () => {
  const StockTransaction = jest.fn().mockImplementation((data) => ({
    ...data,
    save: jest.fn().mockResolvedValue(),
  }));

  StockTransaction.find = jest.fn();

  return StockTransaction;
});

const StockTransaction = require("../models/StockTranscationmodel");
const {
  createStockTransaction,
  getAllStockTransactions,
  getStockTransactionsByProduct,
  searchStocks,
} = require("../controller/stocktransaction");

const createResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

describe("stock transaction controller", () => {
  beforeEach(() => jest.clearAllMocks());

  test("requires product, type, and quantity", async () => {
    const response = createResponse();

    await createStockTransaction({ body: {} }, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: "Product, type, and quantity are required.",
    });
  });

  test("creates a stock-in transaction", async () => {
    const response = createResponse();
    const request = {
      body: {
        product: "product-1",
        type: "Stock-in",
        quantity: 10,
        supplier: "supplier-1",
      },
    };

    await createStockTransaction(request, response);

    expect(StockTransaction).toHaveBeenCalledWith(request.body);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      message: "Stock transaction created successfully",
    });
  });

  test("returns transactions for a product", async () => {
    const response = createResponse();
    const transactions = [{ product: "product-1", type: "Stock-in" }];
    const sort = jest.fn().mockResolvedValue(transactions);
    StockTransaction.find.mockReturnValue({
      populate: jest.fn().mockReturnValue({ sort }),
    });

    await getStockTransactionsByProduct(
      { params: { productId: "product-1" } },
      response,
    );

    expect(StockTransaction.find).toHaveBeenCalledWith({
      product: "product-1",
    });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ success: true, transactions });
  });

  test("returns not found when a product has no transactions", async () => {
    const response = createResponse();
    StockTransaction.find.mockReturnValue({
      populate: jest
        .fn()
        .mockReturnValue({ sort: jest.fn().mockResolvedValue([]) }),
    });

    await getStockTransactionsByProduct(
      { params: { productId: "missing" } },
      response,
    );

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: "No transactions found for this product.",
    });
  });

  test("requires a search query", async () => {
    const response = createResponse();

    await searchStocks({ query: {} }, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Query parameter is required",
    });
  });

  test("searches by transaction type or populated product name", async () => {
    const response = createResponse();
    const transactions = [
      { type: "Stock-in", product: { name: "Keyboard" } },
      { type: "Stock-out", product: { name: "Monitor" } },
    ];
    StockTransaction.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(transactions),
    });

    await searchStocks({ query: { query: "keyboard" } }, response);

    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith([transactions[0]]);
  });
});
