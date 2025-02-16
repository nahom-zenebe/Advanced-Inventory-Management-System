import React, { useEffect, useState } from 'react';
import TopNavbar from '../Components/TopNavbar';
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Addproduct, gettingallproducts, Searchproduct,Removeproduct } from '../features/productSlice';
import { gettingallCategory } from '../features/categorySlice';
import { FaImage } from "react-icons/fa";
import toast from 'react-hot-toast';

function Productpage() {
  const { getallproduct, isproductadd, searchdata } = useSelector((state) => state.product);
  const { getallCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [query, setquery] = useState("");

  const [name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Description, setDescription] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);




  

  useEffect(() => {
    if (!getallproduct || getallproduct.length === 0) {
      dispatch(gettingallproducts());
    }
  }, [dispatch, getallproduct]);



  useEffect(() => {
    if (!getallCategory || getallCategory.length === 0) {
      dispatch(gettingallCategory());
    }
  }, [dispatch, getallCategory]);



  useEffect(() => {
    if (query.trim() !== "") {
      const repeatTimeout = setTimeout(() => {
        dispatch(Searchproduct(query));
      }, 500);
      return () => clearTimeout(repeatTimeout);
    }
  }, [query, dispatch]);

const handleremove=async(productId)=>{

  
    dispatch(Removeproduct(productId))
    .then(()=>{
      toast.success(" Product add succcessfully")
    })
    .catch((error)=>{
      console.log(error)

    })
  
  
}


  const productData = { name, Description, Category, Price, quantity };

  const submitProduct = async (event) => {
    event.preventDefault();
    dispatch(Addproduct(productData))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully");

        setName("");
        setCategory("");
        setPrice("");
        setQuantity("");
        setDescription("");


      })
      .catch(() => {
        toast.error("Product add unsuccessful");
      });
  };

  return (
    <div>
      <TopNavbar />

      <div className="mt-10 ml-5">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg"
            placeholder="Enter your product"
          />
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-blue-800 text-white w-40 h-12 rounded-lg flex items-center justify-center"
          >
            <IoMdAdd className="text-xl mr-2" /> Add Product
          </button>
        </div>

        {isFormVisible && (
          <div className="absolute top-10 bg-gray-100 right-0 h-svh p-6 border-2 border-gray-300 rounded-lg shadow-md transition-transform transform">
            <div className="text-right">
              <MdKeyboardDoubleArrowLeft onClick={() => setIsFormVisible(false)} className="cursor-pointer text-2xl" />
            </div>

            <h1 className="text-xl font-semibold mb-4">Add Product</h1>

            <div className="mb-4">
              <label>Name</label>
              <input value={name} placeholder='Enter your Name'  onChange={(e) => setName(e.target.value)} type="text" className="w-full h-10 px-2 border-2 rounded-lg mt-2" />
            </div>

            <div className='mt-4 mb-2'>
              <label>Category</label>
              <select value={Category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 px-2 border-2 rounded-lg mt-2">
                <option value="">Select a category</option>
                {getallCategory?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label>Description</label>
              <input value={Description}   placeholder='Enter your Description' onChange={(e) => setDescription(e.target.value)} type="text" className="w-full h-10 px-2 border-2 rounded-lg mt-2" />
            </div>

            <div className="mb-4">
              <label>Price</label>
              <input type="number" placeholder='Enter your Price' value={Price} onChange={(e) => setPrice(e.target.value)} className="w-full h-10 px-2 border-2 rounded-lg mt-2" />
            </div>

            <div className="mb-4">
              <label>Quantity</label>
              <input type="number"  placeholder='Enter your Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full h-10 px-2 border-2 rounded-lg mt-2" />
            </div>

            <button onClick={submitProduct} className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4">
              {isproductadd ? "Adding product..." : "Add Product"}
            </button>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <div className="overflow-x-auto overflow-y-auto">
            <table className="min-w-full bg-white border mb-24 mr-24 border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 border">#</th>
                  <th className="px-3 py-2 border">Name</th>
                  <th className="px-3 py-2 border">Category</th>
                  <th className="px-3 py-2 border">Description</th>
                  <th className="px-3 py-2 border">Price</th>
                  <th className="px-3 py-2 border">Quantity</th>
                  <th className="px-3 py-2 border">Operations</th>
                </tr>
              </thead>
              <tbody>
                {(query.trim() === "" ? getallproduct : searchdata)?.length > 0 ? (
                  (query.trim() === "" ? getallproduct : searchdata).map((product, index) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border text-center">{index + 1}</td>
                      <td className="px-3 py-2 border">{product.name}</td>
                      <td className="px-5 py-2 border">
                        {product.Category ? product.Category.name : "No Category"}
                      </td>
                      <td className="px-3 py-2 border">{product.Description}</td>
                      <td className="px-3 py-2 border">${product.Price}</td>
                      <td className="px-3 py-2 border">{product.quantity}</td>
                      <td className="px-4 grid grid-cols-1 py-2 border">

                        <button onClick={() => handleremove(product._id)}  className='mb-3 h-10 bg-red-500 hover:bg-red-700 rounded-md text-white'>Remove</button>
                        <button className='mb-3 h-10 bg-green-500 hover:bg-green-700 rounded-md text-white'>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 py-2 border text-center">No products available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Productpage;
