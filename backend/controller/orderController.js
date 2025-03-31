const Order = require('../models/Ordermodel');
const logActivity = require('../libs/logger');
const ProductModel = require('../models/Productmodel');

const createOrder = async (req, res) => {
    try {
        const { user, Description,Product, status } = req.body;
  
        if (!user) return res.status(400).json({ message: "User ID is required" });
        if (!Description) return res.status(400).json({ message: "Description is required" });
        if (!status) return res.status(400).json({ message: "Status is required" });
        if (!Product?.product) return res.status(400).json({ message: "Product ID is required" });
        if (!Product?.price) return res.status(400).json({ message: "Price is required" });
        if (!Product?.quantity) return res.status(400).json({ message: "Quantity is required" });

      const {product,price,quantity}=Product;

        const totalOrderAmount = price * quantity;

        const productRecord = await ProductModel.findById(product);
        if (!productRecord) return res.status(404).json({ message: "Product not found" });

        if (productRecord.quantity < quantity) {
            return res.status(400).json({ 
                message: "Insufficient product quantity",
                available: productRecord.quantity,
                requested: quantity
            });
        }

        productRecord.quantity -= quantity;
        await productRecord.save();

        const newOrder = new Order({
            user,
            Description,
            Product,
            totalAmount: totalOrderAmount,
            status,
        });

        await newOrder.save();
        
        res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            success: false,
            message: "Error in creating order", 
            error: error.message,
            validationErrors: error.errors 
        });
    }
};



const Removeorder = async (req, res) => {
    try {
        const { OrdertId } = req.params;
        const userId = req.user._id;
        const ipAddress = req.ip;
        
        const Deletedorder = await Order.findByIdAndDelete(OrdertId);

        if (!Deletedorder) {
            return res.status(404).json({ message: "Order is not found!" });
        }

        await logActivity({
            action: "Delete order",
            description: `Order was deleted.`,
            entity: "order",
            entityId: Deletedorder._id,
            userId: userId,
            ipAddress: ipAddress,
        });

        res.status(200).json({ message: "Order deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting Order", error: error.message });
    }
};


const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({})
  .populate("Product.product", "name ProductModelrice ") 
  .populate("user", "name email"); 

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error getting orders", error: error.message });
    }
};



 
const updatestatusOrder = async (req, res) => {
    try {
        const { OrderId } = req.params;
        const updates = req.body;
        const userId = req.user._id;
        const ipAddress = req.ip;

   
        if (updates.Product && Array.isArray(updates.Product)) {
            updates.totalAmount = updates.Product.reduce((sum, item) => sum + item.quantity * item.ProductModelrice, 0);
        }

  
        const updatedOrder = await Order.findByIdAndUpdate(OrderId, updates, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }


        await logActivity({
            action: "Update Order",
            description: `Order updated successfully.`,
            entity: "order",
            entityId: updatedOrder._id,
            userId: userId,
            ipAddress: ipAddress,
        });

        res.status(200).json({ message: "Order successfully updated", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error: error.message });
    }
};

const searchOrder = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        const searchdata = await Order.find({
            $or: [
                { Desciption: { $regex: query, $options: "i" } },
                { status: { $regex: query, $options: "i" } },
                { "user.name": { $regex: query, $options: "i" } }
            ]
        });

        res.json(searchdata);

    } catch (error) {
        res.status(500).json({ message: "Error in search Orders", error: error.message });
    }
};



const getOrderStatistics=async(req,res)=>{
try {
    const orderStats=await Order.aggregate([
        {
            $group:{
                _id:"$status",
                count:{$sum:1}
            }
        }

    ])


    res.status(200).json(orderStats)
} 

catch (error) {
    
}
}


module.exports = {
    createOrder,
    searchOrder,
    updatestatusOrder,
    getOrder,
    Removeorder,
    getOrderStatistics
};