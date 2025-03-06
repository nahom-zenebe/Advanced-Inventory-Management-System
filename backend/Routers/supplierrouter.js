const express = require("express");
const router = express.Router();
const {createSupplier,searchSupplier,editSupplier,getAllSuppliers,deleteSupplier,getSupplierById} = require("../controller/suppliercontroller");

router.post("/createsupplier", createSupplier); 
router.get("/getallsupplier", getAllSuppliers); 
router.get("/:supplierId",getSupplierById); 
router.get("/searchSupplier",searchSupplier)
router.put("/updatesupplier/:supplierId", editSupplier); 
router.delete("/:supplierId", deleteSupplier); 

module.exports = router;
