const Product=require('../models/Productmodel')
const Category=require('../models/ Categorymodel')
const logActivity=require('../libs/logger')

module.exports.Addproduct=async(req,res)=>{

    try {
      //supllier 
        const { name, Description,Category, Price, quantity } = req.body;
        const userId=req.user._id;
        const ipAddress=req.ip
     
        if (!name|| !Category || !Description|| !Price || !quantity) {
           return res.status(400).json({ error: "Please provide all product details." });
        }

     
        const createdProduct = new Product({
           name, Description, Category, Price, quantity,
        });

        await logActivity({

     action:"Add Product",
      description:`Product "${name} was added`,
      entity:"product",
      entityId:createdProduct._id,
      userId:userId,
      ipAddress:ipAddress,

        })
     
        await createdProduct.save();
     
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
          description: `Product "${deletedProduct.name}" was deleted.`,
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
        const { productId } = req.params;
        const { updatedata } = req.body;
        const userId=req.user._id;
        const ipAddress=req.ip
    
        const updatedproduct = await Product.findByIdAndUpdate(productId, { ...updatedata }, { new: true });
    


        await logActivity({
          action: "Update Product",
          description: `Product "${updatedproduct.name}" was updated.`,
          entity: "product",
          entityId: updatedproduct._id,
          userId: userId,
          ipAddress: ipAddress,
        });

        
        
        res.json(updatedproduct);
      } catch (error) {
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
  
  

