const express = require('express');
const router = express.Router();
const {createStockTransaction,getAllStockTransactions,getStockTransactionsByProduct,getStockTransactionsBySupplier} = require('../controller/stocktransaction');


router.post('/createStockTransaction', createStockTransaction);
router.get('/getallStockTransaction', getAllStockTransactions);
router.get('/product/:productId',getStockTransactionsByProduct);
router.get('/supplier/:supplierId',getStockTransactionsBySupplier);

module.exports = router;
