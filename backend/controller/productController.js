const Product=require('../models/Productmodel')
const Category=require('../models/ Categorymodel')

module.exports.Addproduct=async(req,res)=>{

    try {
      //supllier 
        const { name, Description,Category, Price, quantity } = req.body;
     
        if (!name|| !Category || !Description|| !Price || !quantity) {
           return res.status(400).json({ error: "Please provide all product details." });
        }
     
        const createdProduct = new Product({
           name, Description, Category, Price, quantity,
        });
     
        await createdProduct.save();
     
        res.status(201).json({ message: "Product created successfully" });
     
     } catch (error) {
        
        res.status(500).json({ message: "Error in creating product", error: error.message });
     }
    }  

    module.exports.getProduct = async (req, res) => {
        try {
          
            const Products = await Product.find({}).populate('Category');  
            
            if (!Products || Products.length === 0) {
                return res.status(404).json({ message: "Products not found" });
            }
    
            res.status(200).json(Products);  
        } catch (error) {
            res.status(500).json({ message: "Error getting products", error: error.message });
        }
    };
    





module.exports.RemoveProduct=async(req,res)=>{
    try {
    const {ProductId}=req.params
    const DeletedProduct=await Product.findByIdAndDelete(ProductId)

     if(!DeletedProduct){
       return  res.status(404).json({message:"Product is not found!"})
     }

     res.status(200).json({message:"Product delete successfully"})

        
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
}



module.exports.EditProduct=async(req,res)=>{
    try {
    const {productId}=req.params
    const {updatedata}=req.body

    const updatedproduct=await Product.findByIdAndUpdate(productId,updatedata,{new:true})
   
    res.json( updatedproduct); 
        
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
}





module.exports.SearchProduct=async(req,res)=>{
    try {
    const {query}=req.query
    if(!query){
        return res.status(400).json({ message: "Query parameter is required" })
    }

    const products=await Product.find({
        $or:[
            {name:{$regex:query,$options:"i"}},
            {Category:{$regex:query,$optons:"i"}},
            {Desciption:{$regex:query,$options:"i"}}
        ]
    })


    res.json(products);

     
        
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
}



