const Sale = require("../models/Salesmodel");
const Product = require("../models/Productmodel");

module.exports.createSale = async (req, res) => {
  try {
    const { customerName, products, paymentMethod, paymentStatus, status } = req.body;

    if (!customerName || !products || !products.product || !products.quantity || !products.price || !paymentMethod) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }


    const totalAmount = products.quantity * products.price;

    const newSale = new Sale({
      customerName,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus,
      status,
    });

    await newSale.save();

    res.status(201).json({ success: true, message: "Sale created successfully", sale: newSale });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating sale", error });
  }
};


module.exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("products.product").sort({ createdAt: -1 });

    res.status(200).json({ success: true, sales });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching sales", error });
  }
};


module.exports.getSaleById = async (req, res) => {
  try {
    const { saleId } = req.params;

    const sale = await Sale.findById(saleId).populate("products.product");

    if (!sale) {
      return res.status(404).json({ success: false, message: "Sale not found" });
    }

    res.status(200).json({ success: true, sale });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching sale", error });
  }
};

module.exports.updateSale = async (req, res) => {
  try {
    const { saleId } = req.params;
    const { customerName, products, paymentMethod } = req.body;


    if (!customerName || !products || !paymentMethod) {
      return res.status(400).json({ 
        success: false, 
        message: "Customer name, products, and payment method are required." 
      });
    }


    const sale = await Sale.findById(saleId);
    if (!sale) {
      return res.status(404).json({ 
        success: false, 
        message: "Sale not found." 
      });
    }

   
    const { quantity, price } = products;
    if (!quantity || !price) {
      return res.status(400).json({ 
        success: false, 
        message: "Products must have a quantity and price." 
      });
    }

  
    const totalAmount = quantity * price;

  
    sale.customerName = customerName;
    sale.products = products; 
    sale.totalAmount = totalAmount;
    sale.paymentMethod = paymentMethod;


    const updatedSale = await sale.save();

    
    res.status(200).json({ 
      success: true, 
      message: "Sale updated successfully", 
      sale: updatedSale 
    });
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating sale", 
      error: error.message 
    });
  }
};



module.exports.SearchSales = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
     
      const allSales = await Sale.find().populate("products.product");
      return res.status(200).json({ success: true, sales: allSales });
    }

    const searchdata = await Sale.find({
      $or: [
        { customerName: { $regex: query, $options: "i" } },
        { paymentMethod: { $regex: query, $options: "i" } }
      ]
    }).populate("products.product"); // Ensure product details are included

    res.status(200).json({ sales: searchdata });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error in searching sales", error: error.message });
  }
};
