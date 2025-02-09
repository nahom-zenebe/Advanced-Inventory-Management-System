const express = require("express");
const router = express.Router();
const {createSale,getAllSales,getSaleById,updateSaleStatus,updatePaymentStatus} = require("../controller/salescontroller");

router.post("/createsales", createSale);
router.get("/getallsales", getAllSales); 
router.get("/:saleId", getSaleById);
router.put("/:saleId/status", updateSaleStatus); 
router.put("/:saleId/payment-status",updatePaymentStatus); 

module.exports = router;
