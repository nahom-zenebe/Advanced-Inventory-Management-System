import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {gettingallproducts} from '../features/productSlice'
import FormattedTime from "../lib/FormattedTime ";
import {
  CreateSales,gettingallSales
} from "../features/salesSlice";

import toast from "react-hot-toast";



function Salespage() {
  const {   getallsales,
    isgetallsales, iscreatedsales
     } = useSelector(
    (state) => state.sales
  );
  const dispatch = useDispatch();


  const [name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Product, setProduct] = useState("");
  const [Payment, setPayment] = useState("");
  const [Price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  


  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);



  useEffect(() => {
   dispatch(gettingallSales())
  }, [dispatch]);

  console.log(   getallsales)


 
  
 


  

  
 /* const handleEditSubmit = (event) => {
    event.preventDefault();

    if (!selectedProduct) return;

    const updatedData = {
      name,
      Product,
       Payment,
       Price,
       quantity,

    };

    dispatch(EditProduct({ id: selectedProduct._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Product updated successfully");
        setIsFormVisible(false);
        setSelectedProduct(null);
        resetForm();
      })
      .catch(() => {
        toast.error("Failed to update product");
      });
  };
  */


  const submitsales = async (event) => {
    event.preventDefault();
    const salesData = { name, Product,Payment };

    dispatch(CreateSales(salesData))
      .unwrap()
      .then(() => {
        toast.success("sales added successfully");
        resetForm();
      })
      .catch(() => {
        toast.error("sales add unsuccessful");
      });
  };


  const resetForm = () => {
    setName("");
    setProduct("");
    setPayment("");
    setPrice("");
    setQuantity("");

  };
  
/*
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setProduct(product.Category?._id || "");
    setPayment(product.Price);
    setPrice(product.Price);
    setQuantity(product.quantity);
   
  };

  */
 

/* const displayProducts = query.trim() !== "" ? searchdata : getallproduct;*/

  return (
    <div>
      <TopNavbar />




      
      <div className="mt-12 ml-5">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg"
            placeholder="Enter your product"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setSelectedProduct(null);
            }}
            className="bg-blue-800 text-white w-40 h-12 rounded-lg flex items-center justify-center"
          >
            <IoMdAdd className="text-xl mr-2" /> Add Sales
          </button>
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

            <form onSubmit={submitsales}>
              <div className="mb-4">
                <label>Name</label>
                <input
                  value={name}
                  placeholder="Enter product name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              <div className="mb-4">
                <label>Product</label>
                <select
                  value={Product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                >
                  <option value="">Select a Product</option>
                  {gettingallproducts?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              <div className="mb-4">
                <label>Quantity</label>
                <input
                  type="number"
                  placeholder="Enter product quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>


              <div className="mb-4">
                <label>Payment</label>
                <input
                  type="number"
                  placeholder="Enter Payment"
                  value={Payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
              >
                {"Add Product"}
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Sales List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border mb-24 border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                <th className="px-3 py-2 border w-5">#</th>
                  <th className="px-3 py-2 border">Name</th>
                  <th className="px-3 py-2 border">Product</th>
                  <th className="px-3 py-2 border">Total Amount</th>
                  <th className="px-3 py-2 border">Status</th>
                  <th className="px-3 py-2 w-72 border">Date</th>
                  <th className="px-3 py-2 w-72 border">Payment</th>
                  <th className="px-3 py-2 w-72 border">Operation</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(getallsales) &&
                getallsales.length > 0 ? (
                  getallsales.map((sales,index) => (
                    <tr key={sales._id} className="hover:bg-gray-50">
                       <td className="px-3 py-2 border">{index+1}</td>
                      <td className="px-3 py-2 border">{sales.customerName
                      }</td>
                      <td className="px-3 py-2 border">
                        {sales.products.length|| "No Category"}
                      </td>
                      <td className="px-3 py-2 border">
                        {sales.totalAmount}
                      </td>
                     
                      <td className="px-3 py-2 border">
                        {sales.status
                        }
                      </td>
                      <td>< FormattedTime  timestamp={sales.createdAt}/></td>
                      <td className="px-3 py-2 border">{sales.paymentMethod}</td>
                      <td className="px-4  py-2 border">
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
                      No sales found.
                    </td>
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



export default Salespage