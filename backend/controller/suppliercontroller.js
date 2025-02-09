const Supplier = require("../models/Suppliermodel");


exports.createSupplier = async (req, res) => {
  try {
    const { name, contactInfo, productsSupplied } = req.body;

    if (!name || !contactInfo || !productsSupplied) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newSupplier = new Supplier({
      name,
      contactInfo,
      productsSupplied,
    });

    await newSupplier.save();

    res.status(201).json({ success: true, message: "Supplier created successfully", supplier: newSupplier });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating supplier", error });
  }
};


exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("productsSupplied");

    res.status(200).json({ success: true, suppliers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching suppliers", error });
  }
};


exports.getSupplierById = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findById(supplierId).populate("productsSupplied");

    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    res.status(200).json({ success: true, supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching supplier", error });
  }
};


exports.updateSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { name, contactInfo, productsSupplied } = req.body;

    const supplier = await Supplier.findById(supplierId);

    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }


    if (name) supplier.name = name;
    if (contactInfo) supplier.contactInfo = contactInfo;
    if (productsSupplied) supplier.productsSupplied = productsSupplied;

    await supplier.save();

    res.status(200).json({ success: true, message: "Supplier updated successfully", supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating supplier", error });
  }
};


exports.deleteSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findByIdAndDelete(supplierId);

    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    res.status(200).json({ success: true, message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting supplier", error });
  }
};
