const express = require("express");
const router = express.Router();
const {createSale,getAllSales,getSaleById,updateSale} = require("../controller/salescontroller");

router.post("/createsales", createSale);
router.get("/getallsales", getAllSales); 
router.get("/:saleId", getSaleById);
router.put("/sales/saleId",updateSale); 


module.exports = router;
