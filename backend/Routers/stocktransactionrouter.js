const express = require('express');
const router = express.Router();
const StockTransactionController = require('../controllers/StockTransactionController');


router.post('/createStockTransaction', StockTransactionController.createStockTransaction);
router.get('/getallStockTransaction', StockTransactionController.getAllStockTransactions);
router.get('/product/:productId', StockTransactionController.getStockTransactionsByProduct);
router.get('/supplier/:supplierId', StockTransactionController.getStockTransactionsBySupplier);

module.exports = router;
