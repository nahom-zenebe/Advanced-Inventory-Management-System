import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {gettingallproducts} from '../features/productSlice'
import FormattedTime from "../lib/FormattedTime ";
import {
  CreateSales,gettingallSales,EditSales, searchsalesdata
} from "../features/salesSlice";
import SalesChart from '../lib/Salesgraph';
import toast from "react-hot-toast";



function Salespage() {
  const {   getallsales, searchdata,
    isgetallsales,  editedsales, iscreatedsales
     } = useSelector(
    (state) => state.sales
  );

  const { getallproduct } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [query, setquery] = useState("");

  const [name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Product, setProduct] = useState("");
  const [Payment, setPayment] = useState("");
  const [Price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paymentStatus , setpaymentStatus]=useState("");
  const[Status,setStatus]=useState("")
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedSales, setselectedSales] = useState(null);



  useEffect(() => {
   dispatch(gettingallSales())
  
  }, [dispatch,  CreateSales,EditSales]);

 
  useEffect(() => {
    if (query.trim() !== "") {
      const repeatTimeout = setTimeout(() => {
        dispatch( searchsalesdata(query));
      }, 500);
      return () => clearTimeout(repeatTimeout);
    } else {
      dispatch(gettingallSales());
    }
  }, [query, dispatch]);


 
  
 


  

  
 const handleEditSubmit = (event) => {
  event.preventDefault();
  if (!selectedSales) return;

  const updatedData = {
    customerName: name,
    products: {
      product: Product, 
      quantity: Number(quantity),
      price: Number(Price)
    },
    paymentMethod: Payment,
    paymentStatus,
    status: Status
  };

  console.log("Updated Data:", updatedData); 

  dispatch(EditSales({ salesId: selectedSales._id, updatedData }))
    .unwrap()
    .then(() => {
      toast.success("Sale updated successfully");
      setIsFormVisible(false);
      setselectedSales(null);
      resetForm();
    })
    .catch((error) => {
      console.error("Error updating sale:", error); 
      toast.error("Failed to update sale");
    });
};


  const submitsales = async (event) => {
    event.preventDefault();
  
    const salesData = {
      customerName: name, 
      products: { product: Product, quantity, price: Price }, 
      paymentMethod: Payment, 
      paymentStatus,
      status: Status
    };
  
    dispatch(CreateSales(salesData))
      .unwrap()
      .then(() => {
        toast.success("Sales added successfully");
        resetForm();
      })
      .catch(() => {
        toast.error("Sales add unsuccessful");
      });
  };
  




  const resetForm = () => {
    setName("");
    setProduct("");
    setPayment("");
    setPrice("");
    setQuantity("");
    setpaymentStatus("");
    setStatus("");

  };
  
  const handleEditClick = (sales) => {
    setselectedSales(sales);
    setName(sales.customerName);
    setProduct(sales.products?.product._id || "");
    setPayment(sales.paymentMethod);
    setPrice(sales.products?.price || "");
    setQuantity(sales.products?.quantity || "");
    setpaymentStatus(sales.paymentStatus);
    setStatus(sales.status);
    setIsFormVisible(true); 
  };
 







 const displaySales = query.trim() !== "" ? searchdata : getallsales;



  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />




      
      <div className="mt-12 ml-5">

        <SalesChart className=" mb-10" />
        <div className="flex items-center space-x-4">
          <input
           value={query}
           onChange={(e)=>setquery(e.target.value)}
            type="text"
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg"
            placeholder="Enter your product"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setselectedSales(null);
            }}
            className="bg-blue-800 text-white w-40 h-12 rounded-lg flex items-center justify-center"
          >
            <IoMdAdd className="text-xl mr-2" /> Add Sales
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
              {selectedSales ? "Edit Sales" : "Add Sales"}
            </h1>

            <form onSubmit={selectedSales ? handleEditSubmit : submitsales}>
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

              <div className="mb-4 ">
                <label>Product</label>
                <select
                  value={Product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                >
                  <option value="">Select a Product</option>
                  {getallproduct.map((product) => (
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
                <select className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                 value={Payment} onChange={(e)=>setPayment(e.target.value)}>
                  <option value="">Select Payment Method</option>
                  <option value={"cash"}>cash</option>
                  <option value={"creditcard"}>creditcard</option>
                  <option value={"banktransfer"}>banktransfer</option>
                
                </select>
              </div>


              <div className="mb-4">
                <label>payment Status</label>
                <select className="w-full h-10 px-2 border-2 rounded-lg mt-2" value={paymentStatus} onChange={(e)=>setpaymentStatus(e.target.value)}>
                  <option value="">Select Payment Status</option>
                  <option value={"pending"}>pending</option>
                  <option value={"paid"}>paid</option>
                
                </select>
              </div>


              <div className="mb-4">
                <label>Status</label>
                <select className="w-full h-10 px-2 border-2 rounded-lg mt-2" value={Status} onChange={(e)=>setStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value={"pending"}>pending</option>
                  <option value={"completed"}>completed</option>
                  <option value={"cancelled"}>cancelled</option>
                
                </select>
              </div>


              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
              >
                    {selectedSales ? "Edit sales" : "Add sales"}
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Sales List</h2>
          <div className="overflow-x-auto">
            <table className="bg-base-100 min-w-full bg-white border mb-24 border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                <th className="px-3 py-2 border w-5 bg-base-100">#</th>
                  <th className="px-3 py-2 border bg-base-100">Customer Name</th>
                  <th className="px-3 py-2 border bg-base-100">Product</th>
                  <th className="px-3 py-2 border bg-base-100">Total Amount</th>
                  <th className="px-3 py-2 border bg-base-100">Status</th>
                  <th className="px-3 py-2  border bg-base-100">Date</th>
                  <th className="px-3 py-2 border bg-base-100">Payment Method</th>
                  <th className="px-3 py-2 border bg-base-100">Payment Status</th>
                  <th className="px-3 py-2  border bg-base-100">Operation</th>
                </tr>
              </thead>
              <tbody className="bg-base-100">
                {Array.isArray(displaySales) &&
               displaySales.length > 0 ? (
                displaySales.map((sales,index) => (
                    <tr key={sales?._id} className="">
                       <td className="px-3 py-2 border">{index+1}</td>
                      <td className="px-3 py-2 border">{sales?.customerName
                      }</td>
                      <td className="px-3 py-2 border">
                      {sales.products?.product?.name || "No Product"}
                      </td>
                      <td className="px-3 py-2 border">
                       $ {sales?.totalAmount}
                      </td>
                     
                      <td className="px-3 py-2 border">
                        {sales?.status
                        }
                      </td>
                      <td className="px-3 py-2 border">< FormattedTime  timestamp={sales?.createdAt}/></td>
                      <td className="px-3 py-2 border">{sales?.paymentMethod}</td>

                      <td className="px-3 py-2 border">
                        {sales?.paymentStatus
                        || "hwllomd"}
                      </td>

                      <td className="px-4  py-2 border">
                        <button
                         onClick={()=> handleEditClick(sales)}
                          className="h-10 w-24 bg-green-500 ml-10 hover:bg-green-700 rounded-md text-white"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className=" bg-base-100 text-center py-4">
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