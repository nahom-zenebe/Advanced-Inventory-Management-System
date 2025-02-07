const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentMethod: { type: String, enum: ["cash", "credit card", "bank transfer"], required: true },
    invoiceUrl: { type: String }, 
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },

{ timestamps: true }
);

module.exports = mongoose.model("Sale", SaleSchema);
