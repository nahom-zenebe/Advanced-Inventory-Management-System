const Category=require('../models/ Categorymodel')



module.exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Please provide all necessary information." });
        }

        const newCategory = new Category({
            name, 
            description
        });

        await newCategory.save();
        res.status(201).json(newCategory);

    } catch (error) {
        res.status(500).json({ message: "Error in creating Category", error: error.message });
    }
};





module.exports.RemoveCategory=async(req,res)=>{
    try {
        const {CategoryId}=req.body
        const DeletedCategory=await Category.findByIdAndDelete(CategoryId)
    
         if(!DeletedCategory){
           return  res.status(404).json({message:"Category is not found!"})
         }
    
         res.status(200).json({message:"Category delete successfully"})
    
            
        } catch (error) {
            res.status(500).json({ message: "Error deleting Category", error: error.message });
        }


}

module.exports.getCategory=async(req,res)=>{
    try {
      
     const allCategory=await Category.find({})

     if(!allCategory){
        return res.status(404).json({message:"Category is not found"})
     }

     res.status(200).json({allCategory})

        
    } catch (error) {
        res.status(500).json({ message: "Error getting Category", error: error.message });
    }
}

module.exports.updateCategory=async(req,res)=>{
    try {
        const {updatedCategory}=req.body
        const {CategoryId}=req.params

        const updatingCategory=await Category.findByIdAndUpdate(CategoryId,updatedCategory,{new:true})

            if(!updatingCategory)
                {
                    return  res.status(400).json({message:"Category is not found"})

                }
                
                res.status(200).json({message:"Category successfully updated"})


    } catch (error) {
        res.status(500).json({ message: "Error in update status Category", error: error.message });
    }

}
