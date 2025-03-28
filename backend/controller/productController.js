const Product=require('../models/Productmodel')

const logActivity=require('../libs/logger')

module.exports.Addproduct=async(req,res)=>{
  const userId=req.user._id;
  const ipAddress=req.ip

    try {

        const { name,   Desciption,Category, Price, quantity } = req.body;
        
   
     
        if (!name|| !Category || !  Desciption|| !Price || !quantity) {
           return res.status(400).json({ error: "Please provide all product details." });
        }

     
        const createdProduct = new Product({
           name,Desciption, Category, Price, quantity,
        });

        await createdProduct.save();

       await logActivity({

     action:"Add Product",
      description:`Product ${name} was added`,
      entity:"product",
      entityId:createdProduct._id,
      userId:userId,
      ipAddress:ipAddress,

        })
     
     
        res.status(201).json({ message: "Product created successfully" });
     
     } catch (error) {
        
        res.status(500).json({ message: "Error in creating product", error: error.message });
     }
    }  

    module.exports.getProduct = async (req, res) => {
        try {
          
          const Products = await Product.find({}).populate('Category'); 


          const totalProduct=await Product.countDocuments({})
     
            
            if (!Products || Products.length === 0) {
                return res.status(404).json({ message: "Products not found" });
            }

            

    
            res.status(200).json({Products,totalProduct});  
        } catch (error) {
            res.status(500).json({ message: "Error getting products", error: error.message });
        }
    };
    





    module.exports.RemoveProduct = async (req, res) => {
      try {
        const { productId } = req.params; 
        const userId=req.user._id;
        const ipAddress=req.ip
    
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
        res.status(500).json({ message: "Error deleting product", error: error.message });
      }
    };
    



    module.exports.EditProduct = async (req, res) => {
      try {
        const { productId, updatedData } = req.body;
        const userId = req.user._id;
        const ipAddress = req.ip;
    
   
        if (!updatedData || typeof updatedData !== 'object') {
          return res.status(400).json({ message: "Invalid update data provided." });
        }
    

        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { ...updatedData },
          { new: true } 
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
        res.status(500).json({ message: "Error updating product", error: error.message });
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
       
          { 'Category.name': { $regex: query, $options: 'i' } },
        ],
      });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error finding product", error: error.message });
    }
  };
  



  module.exports.getTopProductsByQuantity = async (req, res) => {
  try {
    const topProducts = await Product.find({})
      .sort({ quantity: -1 }) 
      .limit(10); 

    if (!topProducts || topProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ success: true, topProducts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products for chart", error: error.message });
  }
};

  

