import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import FormattedTime from "../lib/FormattedTime ";
import Stocktanscationgraph from '../lib/Stocktanscationgraph'
import {
  createStockTransaction,
  getAllStockTransactions,
  searchstockdata
} from "../features/stocktransactionSlice";
import {
  gettingallSupplier
} from "../features/SupplierSlice";
import {
  gettingallproducts,
} from "../features/productSlice";
import toast from "react-hot-toast";

function StockTransaction() {
  const { getallStocks, isgetallStocks, iscreatedStocks,searchdata } = useSelector(
    (state) => state.stocktransaction
  );

  const { getallSupplier } = useSelector(
    (state) => state.supplier
  );
  const { getallproduct } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
const[query,setquery]=useState("");
  const [product, setproduct] = useState("");
  const [type, settype] = useState("");
  const [quantity, setquantity] = useState("");
  const [supplier, setsupplier] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    if ( query.trim() !== "") {
      const repeatTimeout = setTimeout(() => {
        dispatch(searchstockdata(query));
      }, 500);
      return () => clearTimeout(repeatTimeout);
    } else {
      dispatch(getAllStockTransactions());
    }
  }, [query, dispatch]);





  useEffect(() => {
    dispatch(gettingallproducts());
    dispatch(getAllStockTransactions());
    dispatch(gettingallSupplier());

    
  }, [dispatch]);


  const resetForm = () => {
    setproduct("");
    settype("");
    setquantity("");
    setsupplier("");
  };


  const submitstocktranscation = async (event) => {
    event.preventDefault();
    const StocksData = {product, type,quantity , supplier };

    dispatch(createStockTransaction(StocksData))
      .unwrap()
      .then(() => {
        toast.success("Stock added successfully");
        resetForm();
      })
      .catch(() => {
        toast.error("Stock add unsuccessful");
      });
  };



  
  const displaystock = query.trim() !== "" ?  searchdata : getallStocks;
  return (
    <div className="bg-base-100 min-h-screen">

<TopNavbar />


<Stocktanscationgraph className="mt-10"/>
<div className="mt-12 ml-5">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e)=>setquery(e.target.value)}
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg"
            placeholder="Enter your Stock"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setSelectedProduct(null);
            }}
            className="bg-blue-800 text-white w-40 h-12 rounded-lg flex items-center justify-center"
          >
            <IoMdAdd className="text-xl mr-2" /> Add Stock
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
            Add Product
             
            </h1>

            <form onSubmit={submitstocktranscation}>
              

              <div className="mb-4">
                <label>Product</label>
                <select
                  value={product}
                  onChange={(e) => setproduct(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                >
                  <option value="">Select a product</option>
                  { getallproduct?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>



              <div className="mb-4">
                <label>type</label>
                <select value={type}   className="w-full h-10 px-2 border-2 rounded-lg mt-2"  onChange={(e) => settype(e.target.value)}>
                  <option value={"Stock-in"}>Stock-in</option>
                  <option value={"Stock-out"}>Stock-out</option>
                </select>
              </div>


              <div className="mb-4">
                <label>Quantity</label>
                <input
                  type="number"
                  placeholder="Enter product quantity"
                  value={quantity}
                  onChange={(e) => setquantity(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>



              <div className="mb-4">
                <label>Supplier</label>
                <select
                  value={supplier}
                  onChange={(e) => setsupplier(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                >
                  <option value="">Select a Supplier</option>
                  { getallSupplier?.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>



              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
              >
                { iscreatedStocks ? "Add Stock....": "Add Stock"}
              </button>
            </form>
          </div>
        )}


<div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">StockTransaction List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-base-100  border mb-24 border-gray-200 rounded-lg shadow-md">
              <thead className="">
                <tr>
                <th className="px-3 py-2 border w-5">#</th>
                  <th className="px-3 py-2 border">Date</th>
                  <th className="px-3 py-2 border">Product</th>
                  <th className="px-3 py-2 border">Type</th>
                  <th className="px-3 py-2 border">Quantity</th>
                  <th className="px-3 py-2 border">Supplier</th>

              
                </tr>
              </thead>
              <tbody>
                {Array.isArray( displaystock) &&
             displaystock.length > 0 ? (
              displaystock.map((Stocks,index) => (
                    <tr key={Stocks._id} >
                       <td className="px-3 py-2 border">{index+1}</td>
                       <td className="px-3 py-2 border">
                        <FormattedTime  timestamp={Stocks.transactionDate}/>
                       </td>
                      <td  className="px-3 py-2 border">box</td>
                     
                      <td className="px-3 py-2 border">
                        {Stocks.type}
                      </td>
                      <td className="px-3 py-2 border">{Stocks.quantity}</td>
                      <td  className="px-3 py-2 border">Abebe</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Stocks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>



        </div>

    </div>
  )
}

export default StockTransaction;
