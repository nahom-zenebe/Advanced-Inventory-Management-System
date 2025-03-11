const StockTransaction = require('../models/StockTranscationmodel');


module.exports.createStockTransaction = async (req, res) => {
  try {
    const { product, type, quantity, supplier } = req.body;

    if (!product || !type || !quantity) {
      return res.status(400).json({ success: false, message: "Product, type, and quantity are required." });
    }

    const newTransaction = new StockTransaction({
      product,
      type,
      quantity,
      supplier,
    });

    await newTransaction.save();

    res.status(201).json( {message: "Stock transaction created successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating stock transaction", error });
  }
};


module.exports.getAllStockTransactions = async (req, res) => {
  try {
    const transactions = await StockTransaction.find()
    .sort({ transactionDate: -1 });

    res.status(200).json({message: "Stock transaction created successfully",transactions});
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stock transactions", error });
  }
};


module.exports.getStockTransactionsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const transactions = await StockTransaction.find({ product: productId }).populate('Supplier').sort({ transactionDate: -1 });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found for this product." });
    }

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching transactions by product", error });
  }
};


module.exports.getStockTransactionsBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const transactions = await StockTransaction.find({ supplier: supplierId }).populate('product').sort({ transactionDate: -1 });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found for this supplier." });
    }

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching transactions by supplier", error });
  }
};


module.exports.searchStocks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const stocks = await StockTransaction.find({})
      .populate('product') 
      .then((transactions) => {
        return transactions.filter((transaction) => 
          transaction.type.toLowerCase().includes(query.toLowerCase()) ||
          (transaction.product && transaction.product.name.toLowerCase().includes(query.toLowerCase()))
        );
      });

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error finding product", error: error.message });
  }
};