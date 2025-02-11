const express = require("express");
const router = express.Router();
const {createSupplier,getAllSuppliers,updateSupplier,deleteSupplier,getSupplierById} = require("../controller/suppliercontroller");

router.post("/createsupplier", createSupplier); 
router.get("/getallsupplier", getAllSuppliers); 
router.get("/:supplierId",getSupplierById); 
router.put("/:supplierId", updateSupplier); 
router.delete("/:supplierId", deleteSupplier); 

module.exports = router;
