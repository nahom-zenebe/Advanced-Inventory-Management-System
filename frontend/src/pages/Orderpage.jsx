import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TopNavbar from "../Components/TopNavbar";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { signup } from "../features/authSlice";
import FormattedTime from "../lib/FormattedTime ";
import OrderStatusChart from "../lib/OrderStatusChart"
import {
  createdOrder,
  Removedorder,
  updatestatusOrder,
  gettingallOrder,
  SearchOrder,
 
} from "../features/orderSlice";

import { gettingallproducts } from "../features/productSlice";
import { gettingallCategory } from "../features/categorySlice";

function Orderpage() {
 
  const {
    getorder,
    isgetorder,
    isorderadd,
    isorderremove,
    editorder,
    iseditorder,
    searchdata,
    isshowgraph,
  statusgraph
  } = useSelector((state) => state.order);
  const { getallproduct } = useSelector((state) => state.product);
  const { getallCategory } = useSelector((state) => state.category);
  const { Authuser, isUserSignup } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [status, setstatus] = useState(false);
  const [query, setquery] = useState("");
  const [Product, setProduct] = useState("");
  const [Price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Description, setDescription] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedOrder, setselectedOrder] = useState(null);

  useEffect(() => {
    dispatch(gettingallOrder());
    dispatch(gettingallproducts());
    dispatch(gettingallCategory());
 
  }, [dispatch,Authuser]);

  useEffect(() => {
    dispatch(gettingallOrder());
 
  }, [dispatch,  editorder]);











  useEffect(() => {
    if (query.trim() !== "") {
      const repeatTimeout = setTimeout(() => {
        dispatch(SearchOrder(query));
      }, 500);
      return () => clearTimeout(repeatTimeout);
    } else {
      dispatch(gettingallOrder());
    }
  }, [query, dispatch]);

  const handleEditSubmit = (event) => {
    event.preventDefault();


    if (!selectedOrder) return;

    const updatedData = {
      user: Authuser?.id || " ",
      description: Description,
      status,
      products: {
        
          product: Product,
          quantity: Number(quantity),
          Price: Number(Price),
        
      },
    };
    
    dispatch( updatestatusOrder({ OrderId: selectedOrder._id,  updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Order updated successfully");
        setIsFormVisible(false);
        setselectedOrder(null);
        resetForm();
      })
      .catch(() => {
        toast.error("Failed to update Order");
      });
  };

  const submitOrder = async (event) => {
    event.preventDefault();
  

    if (!Product || !Price || !quantity) {
      toast.error("Product, Price and Quantity are required");
      return;
    }
  
    const orderData = {
      user: Authuser?.id || "",
      Description,
      status,
      Product: {
        product: Product,  
        price: Number(Price), 
        quantity: Number(quantity)
      }
    };
  
    try {
      const result = await dispatch(createdOrder(orderData)).unwrap();
      toast.success("Order created successfully");
      resetForm();
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error(error.message || "Failed to create order");
    }
  };

  const resetForm = () => {
    setProduct("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setstatus("");
  };

  const handleEditClick = (order) => {
    setselectedOrder(order);
    setProduct(order.Product.product?._id || "");
    setPrice(order.Product?.price|| "");
    setQuantity(order.Product?.quantity|| "");
    setstatus(order.status|| "");
    setDescription(order.Description|| "");
    setIsFormVisible(true);
  };

  const handleremove = async (OrderId) => {
    dispatch( Removedorder(OrderId))
      .unwrap()
      .then(() => {
        toast.success("Order removed successfully");
      })
      .catch((error) => {
        toast.error(error || "Failed to remove Order");
      });
  };

  const displayOrder = query.trim() !== "" ? searchdata : getorder;




  


  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />

      < OrderStatusChart className="mt-10 mb-10 mx-auto"/>

      <div className="mt-12 ml-5">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg"
            placeholder="Enter your order"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setselectedOrder(null);
            }}
            className="bg-blue-800 text-white w-40 h-12 rounded-lg flex items-center justify-center"
          >
            <IoMdAdd className="text-xl mr-2" /> Add Order
          </button>
        </div>

        {isFormVisible && (
          <div className="absolute top-10 bg-base-100 bg-gray-100 right-0 h-svh p-6 border-2 border-gray-300 rounded-lg shadow-md transition-transform transform">
            <div className="text-right">
              <MdKeyboardDoubleArrowLeft
                onClick={() => setIsFormVisible(false)}
                className="cursor-pointer text-2xl"
              />
            </div>

            <h1 className="text-xl font-semibold mb-4">
              {selectedOrder ? "Edit Order" : "Add Order"}
            </h1>

            <form onSubmit={selectedOrder ? handleEditSubmit : submitOrder}>
              <div className="mb-4">
                <label>Product</label>
                <select
                  value={Product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                >
                  <option value="">Select a Product</option>
                  {getallproduct?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label>Description</label>
                <input
                  value={Description}
                  placeholder="Enter order description"
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              <div className="mb-4">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Enter order Price"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              <div className="mb-4">
                <label>Quantity</label>
                <input
                  type="number"
                  placeholder="Enter order quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              <div className="mb-4">
                <label className="block">status</label>
                <select
                  className="mt-3 w-72 h-10 mb-6"
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                >
                   <option value="">Select a status</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
              >
                {selectedOrder ? "Update order" : "Add order"}
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Order List</h2>
          <div className="overflow-x-auto">
            <table className=" bg-base-100 min-w-full bg-white border mb-24 border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr className="bg-base-100">
                  <th className="px-3 py-2 bg-base-100 border w-5">#</th>
                  <th className="px-3 py-2 bg-base-100 border">Product </th>
                  <th className="px-3 py-2 bg-base-100 border">qunatity</th>
                  <th className="px-3 py-2 bg-base-100 border">Price</th>
                  <th className="px-3 py-2 bg-base-100 border">Description</th>
                  <th className="px-3 py-2  bg-base-100  border">totalAmount</th>
                  <th className="px-3 py-2 bg-base-100  border">status</th>
                  <th className="px-3 py-2 bg-base-100 border">Created by</th>
                  <th className="px-3 py-2 bg-base-100 border">time stamp</th>
                  <th className="px-3 py-2 bg-base-100 border">Operations</th>
                </tr>
              </thead>

              
              <tbody className="bg-base-100">
                {Array.isArray(displayOrder) && displayOrder.length > 0 ? (
           
                  displayOrder.map((order, index) => (
                  

                    <tr key={order?._id} className="bg-base-100">
                      <td className="px-3 py-2 border">{index + 1}</td>
                      <td className="px-3 py-2 border">book</td>{" "}
                      
                      <td className="px-3 py-2 border">
                        {order.Product?.quantity}
                      </td>
                      <td className="px-3 py-2 border">
                        ${order.Product?.price}
                      </td>
                      <td className="px-3 py-2 border">{order?.Description}</td>
                 
                      <td className="px-3 py-2 border">{order?.totalAmount}</td>
                      <td className="px-3 py-2 border">{order?.status}</td>
                      <td className="px-3 py-2 border">{order.user?.name}</td>
                      <td className="px-3 py-2 border">
                        <FormattedTime timestamp={order?.createdAt} />
                      </td>
                      <td className="px-4 py-2 grid grid-cols-1 border">
                        <button
                          onClick={() => handleremove(order._id)}
                          className="h-10 w-24 bg-red-500 hover:bg-red-700 rounded-md text-white"
                        >
                          Remove
                        </button>
    
                        <button
                          onClick={() => handleEditClick(order)}
                          className="h-10 w-24 bg-green-500 ml-10 hover:bg-green-700 rounded-md text-white"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="bg-base-100 text-center py-4">
                      No Order found.
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

export default Orderpage;
