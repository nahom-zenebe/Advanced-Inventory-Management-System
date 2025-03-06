import React,{useState,useEffect} from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaFileExport } from "react-icons/fa6";






import TopNavbar from "../Components/TopNavbar";

import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { gettingallCategory,CreateCategory , RemoveCategory } from "../features/categorySlice";
import toast from "react-hot-toast";




function Categorypage() {



  
  const { getallCategory, iscreatedCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [query, setquery] = useState("");

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);









  // Fetch all products and categories on component mount
  useEffect(() => {

    dispatch(gettingallCategory());
  }, [dispatch,RemoveCategory ]);

  

  /*
  useEffect(() => {
    if (query.trim() !== "") {
      const repeatTimeout = setTimeout(() => {
        dispatch(Searchproduct(query));
      }, 500);
      return () => clearTimeout(repeatTimeout);
    } else {
      dispatch(gettingallproducts()); // Reset to all products if query is empty
    }
  }, [query, dispatch]); */


  const handleremove = async (categoryId) => {
    dispatch( RemoveCategory (categoryId))
      .unwrap()
      .then(() => {
        toast.success("category removed successfully");
      })
      .catch((error) => {
        toast.error(error || "Failed to categoryproduct");
      });
  };

  

  // Handle add product form submission
  const submitCategory = async (event) => {
    event.preventDefault();
    const CategoryData = { name, description};

    dispatch( CreateCategory( CategoryData))
      .unwrap()
      .then(() => {
        toast.success(" CategoryData added successfully");
        resetForm();
      })
      .catch(() => {
        toast.error(" CategoryData add unsuccessful");
      });
  };

  // Reset form fields
  const resetForm = () => {
    setname("");
    setdescription("");
  };

  


  const displayCategory = getallCategory;







  return (

    <div >
         <TopNavbar />
      <div className='flex'>

      <input type='text' placeholder='Search the category' className="w-full ml-10 mt-20 md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg"/>
      <div className='flex mt-20'>
      <button onClick={()=>{
           setIsFormVisible(true);
           setSelectedProduct(null);

      }} className="bg-blue-800 ml-10 text-white w-40 h-12 rounded-lg flex items-center justify-center"><IoMdAdd className='text-xl mr-3'/>Add Category</button>
      <button className="bg-blue-800 ml-5 text-white w-40 h-12 rounded-lg flex items-center justify-center"><FaFileExport className='text-xl mr-3' />Export</button>
      </div>

      </div>


      {isFormVisible && (
          <div className="absolute top-10 bg-gray-100 right-0 h-svh p-6 border-2 border-gray-300 rounded-lg shadow-md transition-transform transform">
            <div className="text-right">
              <MdKeyboardDoubleArrowLeft
                onClick={() => setIsFormVisible(false)}
                className="cursor-pointer text-2xl"
              />
            </div>

            <h1 className="text-xl font-semibold mb-4">
              {selectedProduct ? "Edit Product" : "Add Product"}
            </h1>

            <form onSubmit={ submitCategory}>
              <div className="mb-4">
                <label>Name</label>
                <input
                  value={name}
                  placeholder="Enter product name"
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              

              <div className="mb-4">
                <label>Description</label>
                <input
                  value={description}
                  placeholder="Enter product description"
                  onChange={(e) => setdescription(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              

             

              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
              >
                {selectedProduct ? "Update Category " : "Add Category "}
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl ml-10 font-semibold mb-4">Category List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full ml-10 bg-white border mb-24 border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                <th className="px-3 py-2 border w-5">#</th>
                  <th className="px-3 py-2 border">Name</th>
                  <th className="px-3 py-2 border">Total Product</th>
                  <th className="px-3 py-2 border">Description</th>
                  <th className="px-3 py-2 border">Stock Quantity</th>
                  <th className="px-3 py-2 w-72 border">Operations</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(displayCategory) &&
                displayCategory.length > 0 ? (
                  displayCategory.map((Category,index) => (
                    <tr key={Category._id} className="hover:bg-gray-50">
                       <td className="px-3 py-2 border">{index+1}</td>
                      <td className="px-3 py-2 border">{Category.name}</td>
                      <td className="px-3 py-2 border">
                        {Category.productCount}
                      </td>
                      <td className="px-3 py-2 border">
                        {Category.description}
                      </td>
                      <td className="px-3 py-2 border">
                        10
                      </td>

                      <td className="px-4  py-2 border">
                        <button
                          onClick={() => handleremove(Category._id)}
                         
                          className="h-10 w-24 bg-red-500 hover:bg-red-700 rounded-md text-white"
                        >
                          Remove
                        </button>
                        <button
                    
                          className="h-10 w-24 bg-green-500 ml-10 hover:bg-green-700 rounded-md text-white"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Category found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      
    </div>
  )
}

export default Categorypage