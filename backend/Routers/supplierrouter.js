const express = require("express");
const router = express.Router();
const SupplierController = require("../controller/stocktransaction");

router.post("/createsupplier", SupplierController.createSupplier); 
router.get("/getallsupplier", SupplierController.getAllSuppliers); 
router.get("/:supplierId", SupplierController.getSupplierById); 
router.put("/:supplierId", SupplierController.updateSupplier); 
router.delete("/:supplierId", SupplierController.deleteSupplier); 

module.exports = router;
