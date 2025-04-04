const Product=require('../models/Productmodel')
const Category=require('../models/ Categorymodel')
const logActivity = require('../libs/logger');
const StockTransaction = require('../models/StockTranscationmodel');

module.exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        const userId=req.user._id;
        const ipAddress=req.ip

        if (!name || !description) {
            return res.status(400).json({ message: "Please provide all necessary information." });
        }

        const newCategory = new Category({
            name, 
            description,
        });


        await logActivity({

          action:"Add Category",
           description:`Category "${name} was added`,
           entity:"category",
           entityId:newCategory._id,
           userId:userId,
           ipAddress:ipAddress,
     
             })


        await newCategory.save();
        res.status(201).json(newCategory);

    } catch (error) {
        res.status(500).json({ message: "Error in creating Category", error: error.message });
    }
};





module.exports.RemoveCategory=async(req,res)=>{
    try {
        const {CategoryId}=req.params
        const userId=req.user._id;
        const ipAddress=req.ip
        const DeletedCategory=await Category.findByIdAndDelete(CategoryId)
    
         if(!DeletedCategory){
           return  res.status(404).json({message:"Category is not found!"})
         }
    

         await logActivity({
          action: "Delete Category",
          description: `Category "${DeletedCategory.name}" was deleted.`,
          entity: "category",
          entityId: DeletedCategory._id,
          userId: userId,
          ipAddress: ipAddress,
        });


         res.status(200).json({message:"Category delete successfully"})
    
            
        } catch (error) {
            res.status(500).json({ message: "Error deleting Category", error: error.message });
        }


}


module.exports.getCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({});

    if (!allCategory || allCategory.length === 0) {
      return res.status(404).json({ message: "Categories not found" });
    }

   
    const categoriesWithCount = await Promise.all(
      allCategory.map(async (category) => {
        const count = await Product.countDocuments({ Category: category._id }); 
        return {
          ...category.toObject(),
          productCount: count,
        };
      })
    );
    

    res.status(200).json({ categoriesWithCount });

  } catch (error) {
    res.status(500).json({ message: "Error getting categories", error: error.message });
  }
};

  

module.exports.updateCategory=async(req,res)=>{
    try {
        const {updatedCategory}=req.body
        const {CategoryId}=req.params
        const userId=req.user._id;
        const ipAddress=req.ip



        const updatingCategory=await Category.findByIdAndUpdate(CategoryId,updatedCategory,{new:true})

            if(!updatingCategory)
                {
                    return  res.status(400).json({message:"Category is not found"})

                }

                await logActivity({
                  action: "Update Category",
                  description: `Category "${updatingCategory.name}" was updated.`,
                  entity: "category",
                  entityId: updatingCategory._id,
                  userId: userId,
                  ipAddress: ipAddress,
                });
        
                
                res.status(200).json({message:"Category successfully updated"})


    } catch (error) {
        res.status(500).json({ message: "Error in update status Category", error: error.message });
    }

}


module.exports.Searchcategory = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    
    const category = await Category.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description : { $regex: query, $options: "i" } },
     
      
      ],
    });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error finding category", error: error.message });
  }
};

