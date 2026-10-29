const Product = require("../models/Productmodel");

const logActivity = require("../libs/logger");
const Category = require("../models/ Categorymodel");
const mongoose = require("mongoose");
const { parseProductCsv, csvEscape } = require("../libs/productCsv");

module.exports.Addproduct = async (req, res) => {
  const userId = req.user._id;
  const ipAddress = req.ip;

  try {
    const { name, Desciption, Category, Price, quantity } = req.body;

    if (!name || !Category || !Desciption || !Price || !quantity) {
      return res
        .status(400)
        .json({ error: "Please provide all product details." });
    }

    const createdProduct = new Product({
      name,
      Desciption,
      Category,
      Price,
      quantity,
    });

    await createdProduct.save();

    await logActivity({
      action: "Add Product",
      description: `Product ${name} was added`,
      entity: "product",
      entityId: createdProduct._id,
      userId: userId,
      ipAddress: ipAddress,
    });

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating product", error: error.message });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const Products = await Product.find({}).populate("Category");

    const totalProduct = await Product.countDocuments({});

    if (!Products || Products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json({ Products, totalProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting products", error: error.message });
  }
};

module.exports.RemoveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const ipAddress = req.ip;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    await logActivity({
      action: "Delete Product",
      description: `Product ${deletedProduct.name}" was deleted.`,
      entity: "product",
      entityId: deletedProduct._id,
      userId: userId,
      ipAddress: ipAddress,
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

module.exports.EditProduct = async (req, res) => {
  try {
    const { productId, updatedData } = req.body;
    const userId = req.user._id;
    const ipAddress = req.ip;

    if (!updatedData || typeof updatedData !== "object") {
      return res.status(400).json({ message: "Invalid update data provided." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { ...updatedData },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    await logActivity({
      action: "Update Product",
      description: `Product "${updatedProduct.name}" was updated.`,
      entity: "product",
      entityId: updatedProduct._id,
      userId: userId,
      ipAddress: ipAddress,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

module.exports.SearchProduct = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { Description: { $regex: query, $options: "i" } },

        { "Category.name": { $regex: query, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding product", error: error.message });
  }
};

module.exports.getTopProductsByQuantity = async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ quantity: -1 }).limit(10);

    if (!topProducts || topProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ success: true, topProducts });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching products for chart",
        error: error.message,
      });
  }
};

module.exports.importProducts = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "A CSV file is required." });
  }

  const { rows, errors } = parseProductCsv(req.file.buffer.toString("utf8"));
  if (errors.length) {
    return res
      .status(400)
      .json({ message: "CSV contains invalid rows.", errors });
  }

  try {
    const categoryValues = [...new Set(rows.map((row) => row.category))];
    const categoryIds = categoryValues.filter((value) =>
      mongoose.isValidObjectId(value),
    );
    const categories = await Category.find({
      $or: [
        { name: { $in: categoryValues } },
        ...(categoryIds.length ? [{ _id: { $in: categoryIds } }] : []),
      ],
    });
    const categoryMap = new Map();
    categories.forEach((category) => {
      categoryMap.set(category.name.toLowerCase(), category._id);
      categoryMap.set(category._id.toString(), category._id);
    });

    const duplicateErrors = [];
    const namesInFile = new Set();
    rows.forEach((row) => {
      const key = row.name.toLowerCase();
      if (namesInFile.has(key))
        duplicateErrors.push({
          row: row.rowNumber,
          message: `Duplicate product name: ${row.name}.`,
        });
      namesInFile.add(key);
      if (!categoryMap.has(row.category.toLowerCase())) {
        duplicateErrors.push({
          row: row.rowNumber,
          message: `Category not found: ${row.category}.`,
        });
      }
    });

    const existingProducts = await Product.find({
      name: { $in: rows.map((row) => row.name) },
    }).select("name");
    const existingNames = new Set(
      existingProducts.map((product) => product.name.toLowerCase()),
    );
    rows.forEach((row) => {
      if (existingNames.has(row.name.toLowerCase())) {
        duplicateErrors.push({
          row: row.rowNumber,
          message: `Product already exists: ${row.name}.`,
        });
      }
    });

    if (duplicateErrors.length) {
      return res
        .status(400)
        .json({
          message: "CSV contains invalid rows.",
          errors: duplicateErrors,
        });
    }

    const products = rows.map((row) => ({
      name: row.name,
      Desciption: row.description,
      Category: categoryMap.get(row.category.toLowerCase()),
      Price: row.price,
      quantity: row.quantity,
    }));
    const createdProducts = await Product.insertMany(products, {
      ordered: true,
    });

    await logActivity({
      action: "Bulk Add Products",
      description: `${createdProducts.length} products were imported`,
      entity: "product",
      entityId: createdProducts[0]._id,
      userId: req.user._id,
      ipAddress: req.ip,
    });

    return res
      .status(201)
      .json({
        message: "Products imported successfully.",
        importedCount: createdProducts.length,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error importing products.", error: error.message });
  }
};

module.exports.exportProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.query) {
      filter.$or = [
        { name: { $regex: req.query.query, $options: "i" } },
        { Desciption: { $regex: req.query.query, $options: "i" } },
      ];
    }
    if (req.query.category) {
      const category = mongoose.isValidObjectId(req.query.category)
        ? req.query.category
        : await Category.findOne({
            name: { $regex: `^${req.query.category}$`, $options: "i" },
          }).select("_id");
      filter.Category = category?._id || category;
    }

    const products = await Product.find(filter)
      .populate("Category")
      .sort({ createdAt: -1 });
    const lines = ["name,description,category,price,quantity"];
    products.forEach((product) => {
      lines.push(
        [
          product.name,
          product.Desciption,
          product.Category?.name || "",
          product.Price,
          product.quantity,
        ]
          .map(csvEscape)
          .join(","),
      );
    });

    res.set({
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=products.csv",
    });
    return res.status(200).send(lines.join("\n"));
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error exporting products.", error: error.message });
  }
};
