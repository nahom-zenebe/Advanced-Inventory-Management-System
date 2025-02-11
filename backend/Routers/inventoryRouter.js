const express = require("express");
const router = express.Router();
const {addOrUpdateInventory,getAllInventory,getInventoryByProduct,deleteInventory}= require("../controller/inventorycontroller");

router.post("/inventory", addOrUpdateInventory); 
router.get("/inventory", getAllInventory); 
router.get("/inventory/:productId", getInventoryByProduct); 
router.delete("/inventory/:productId", deleteInventory); 

module.exports = router;
