const Inventory =require('../models/Inventorymodel')
const Product = require("../models/Productmodel");


module.exports.addOrUpdateInventory = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    if (!product || quantity === undefined) {
      return res.status(400).json({ success: false, message: "Product and quantity are required" });
    }

    
    let inventory = await Inventory.findOne({ product });

    if (inventory) {
  
      inventory.quantity = quantity;
      inventory.lastUpdated = Date.now();
    } else {
     
      inventory = new Inventory({
        product,
        quantity,
      });
    }

 
    await inventory.save();

    res.status(200).json({ success: true, message: "Inventory updated successfully", inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating inventory", error });
  }
};



module.exports.getAllInventory = async (req, res) => {
  try {
    const inventories = await Inventory.find().populate("product");

    res.status(200).json({ success: true, inventories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching inventory", error });
  }
};


module.exports.getInventoryByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const inventory = await Inventory.findOne({ product: productId }).populate("product");

    if (!inventory) {
      return res.status(404).json({ success: false, message: "Inventory not found for this product" });
    }

    res.status(200).json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching inventory", error });
  }
};


module.exports.deleteInventory = async (req, res) => {
  try {
    const { productId } = req.params;

    const inventory = await Inventory.findOneAndDelete({ product: productId });

    if (!inventory) {
      return res.status(404).json({ success: false, message: "Inventory not found" });
    }

    res.status(200).json({ success: true, message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting inventory", error });
  }
};
