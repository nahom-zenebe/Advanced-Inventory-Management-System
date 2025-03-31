const Order = require('../models/Ordermodel');
const logActivity = require('../libs/logger');
const ProductModel = require('../models/Productmodel');

const createOrder = async (req, res) => {
    try {
        const { user, Description, Product: productData, status } = req.body;
        
        // Normalize price field (accept both Price and price)
        const price = productData.Price || productData.price;
        const quantity = productData.quantity;

        // Validate required fields
        if (!user) return res.status(400).json({ message: "User ID is required" });
        if (!Description) return res.status(400).json({ message: "Description is required" });
        if (!status) return res.status(400).json({ message: "Status is required" });
        if (!productData?.product) return res.status(400).json({ message: "Product ID is required" });
        if (price === undefined) return res.status(400).json({ message: "Price is required" });
        if (!quantity) return res.status(400).json({ message: "Quantity is required" });

        // Rest of your controller logic using `price` variable...
        const totalOrderAmount = price * quantity;

        const product = await ProductModel.findById(productData.product);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.quantity < quantity) {
            return res.status(400).json({ 
                message: "Insufficient product quantity",
                available: product.quantity,
                requested: quantity
            });
        }

        product.quantity -= quantity;
        await product.save();

        const newOrder = new Order({
            user,
            Description,
            Product: productData.product,
            Price: price, 
            quantity,
            totalAmount: totalOrderAmount,
            status,
        });

        await newOrder.save();
        
        // ... rest of your success handling
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
  .populate("Product.product", "name price ") 
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
            updates.totalAmount = updates.Product.reduce((sum, item) => sum + item.quantity * item.price, 0);
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