const Sale = require("../models/Salesmodel");
const Product = require("../models/Productmodel");


exports.createSale = async (req, res) => {
  try {
    const { customerName, products, paymentMethod} = req.body;

    if (!customerName || !products || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Customer name, products, and payment method are required." });
    }

    let totalAmount = 0;
   
    for (const product of products) {
      const { product: productId, quantity, price } = product;
      totalAmount += quantity * price;
    }

    const newSale = new Sale({
      customerName,
      products,
      totalAmount,
      paymentMethod,
      invoiceUrl,
    });

    await newSale.save();

    res.status(201).json({ success: true, message: "Sale created successfully", sale: newSale });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating sale", error });
  }
};


exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("products.product").sort({ createdAt: -1 });

    res.status(200).json({ success: true, sales });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching sales", error });
  }
};


exports.getSaleById = async (req, res) => {
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


exports.updateSaleStatus = async (req, res) => {
  try {
    const { saleId } = req.params;
    const { status } = req.body;

    if (!status || !["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }

    const sale = await Sale.findById(saleId);
    if (!sale) {
      return res.status(404).json({ success: false, message: "Sale not found." });
    }

    sale.status = status;
    await sale.save();

    res.status(200).json({ success: true, message: `Sale status updated to ${status}.`, sale });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating sale status.", error });
  }
};


exports.updatePaymentStatus = async (req, res) => {
  try {
    const { saleId } = req.params;
    const { paymentStatus } = req.body;

    if (!paymentStatus || !["pending", "paid"].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: "Invalid payment status." });
    }

    const sale = await Sale.findById(saleId);
    if (!sale) {
      return res.status(404).json({ success: false, message: "Sale not found." });
    }

    sale.paymentStatus = paymentStatus;
    await sale.save();

    res.status(200).json({ success: true, message: `Payment status updated to ${paymentStatus}.`, sale });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating payment status.", error });
  }
};
