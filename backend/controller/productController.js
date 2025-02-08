const Product=require('../models/Productmodel')


module.exports.Addproduct=async(req,res)=>{

try {
   const { name,Desciption,Category, Price, quantity,supplier}=req.body

       if(!name||!Desciption|| !Category||! Price||!quantity||!supplier){
        return res.status(400).json({error:"please provide detail information"})
       }

    const createdProduct=new Product({
        name,Desciption,Category, Price, quantity,supplier
    })

    await createdProduct.save()

    res.status(201).json({message:"Product created successfully"})

} catch (error) {
    res.status(500).json({message:"error in creating product"},error)
    
}

}



module.exports.RemoveProduct=async(req,res)=>{
    try {
    const {ProductId}=req.body
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



