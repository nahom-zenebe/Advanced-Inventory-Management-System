const express = require("express");
const router = express.Router();
const InventoryController = require("../controller/inventorycontroller");

router.post("/inventory", InventoryController.addOrUpdateInventory); 
router.get("/inventory", InventoryController.getAllInventory); 
router.get("/inventory/:productId", InventoryController.getInventoryByProduct); 
router.delete("/inventory/:productId", InventoryController.deleteInventory); 

module.exports = router;
