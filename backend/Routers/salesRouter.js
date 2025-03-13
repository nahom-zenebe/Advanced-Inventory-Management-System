const express = require("express");
const router = express.Router();
const {createSale,getAllSales,SearchSales,getSaleById,updateSale} = require("../controller/salescontroller");

router.post("/createsales", createSale);
router.get("/getallsales", getAllSales); 
router.get("/searchdata", SearchSales); 
router.get("/:saleId", getSaleById);
router.put("/updatesales/:saleId",updateSale); 



module.exports = router;
