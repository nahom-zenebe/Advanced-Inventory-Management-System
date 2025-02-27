const Order = require('../models/Ordermodel');
const logActivity = require('../libs/logger');

const createOrder = async (req, res) => {
    try {
        const { user, Description, Product, status } = req.body;
     
        const userId = req.user._id;
        const ipAddress = req.ip;

      
        if (!user || !Description || !Product || !status) {
            return res.status(400).json({ message: "Please provide all necessary information" });
        }

       
        const totalOrderAmount = Product.quantity * Product.price; 

        // Create a new order
        const newOrder = new Order({
            user,
            Description,
            Product,
            totalAmount: totalOrderAmount,
            status
        });

        // Log the activity (if necessary)
        await logActivity({
            action: "Add Order",
            description: `Order was created`,
            entity: "order",
            entityId: newOrder._id,
            userId: userId,
            ipAddress: ipAddress,
        });

        // Save the order to the database
        await newOrder.save();

        // Respond with the new order
        res.status(201).json(newOrder);

    } catch (error) {
        res.status(500).json({ message: "Error in creating order", error: error.message });
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
  .populate("Product.product", "name price ") // Populating the product information
  .populate("user", "name email"); // Populating user details (make sure the user references exist)

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
        const { status, Product } = req.body; 
        const userId = req.user._id;
        const ipAddress = req.ip;


        const order = await Order.findById(OrderId);

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

      
        let totalAmount = 0;
        Product.forEach((item) => {
            totalAmount += item.quantity * item.price; 
        });

      
        order.status = status || order.status; 
        order.Product = Product || order.Product;
        order.totalAmount = totalAmount; 


        await order.save();

        
        await logActivity({
            action: "Update Order",
            description: `Order was updated with new total amount.`,
            entity: "order",
            entityId: order._id,
            userId: userId,
            ipAddress: ipAddress,
        });

        
        res.status(200).json({ message: "Order successfully updated", order });
    } catch (error) {
        res.status(500).json({ message: "Error in updating order status", error: error.message });
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