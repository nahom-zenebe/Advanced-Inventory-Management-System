const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    products: 
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentMethod: { type: String, enum: ["cash", "creditcard", "banktransfer"], required: true },
    invoiceUrl: { type: String }, 
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },

{ timestamps: true }
);

const Sale= mongoose.model("Sale", SaleSchema);

module.exports=Sale
