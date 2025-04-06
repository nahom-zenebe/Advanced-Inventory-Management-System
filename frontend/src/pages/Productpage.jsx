import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import FormattedTime from "../lib/FormattedTime ";
import {
  Addproduct,
  gettingallproducts,
  Searchproduct,
  Removeproduct,
  EditProduct,
} from "../features/productSlice";
import { gettingallCategory } from "../features/categorySlice";
import toast from "react-hot-toast";

function Productpage() {
  const { getallproduct, editedProduct, isproductadd, searchdata } = useSelector(
    (state) => state.product
  );
  const { getallCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [query, setquery] = useState("");
  const [name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Desciption, setDesciption] = useState("");
  const [dateAdded, setDateAdded] = useState(new Date().toISOString().split('T')[0]); // Initialize with current date
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(gettingallproducts());
    dispatch(gettingallCategory());
  }, [dispatch, editedProduct, isproductadd]);

  useEffect(() => {
    if (query.trim() !== "") {
      const repeatTimeout = setTimeout(() => {
        dispatch(Searchproduct(query));
      }, 500);
      return () => clearTimeout(repeatTimeout);
    } else {
      dispatch(gettingallproducts());
    }
  }, [query, dispatch]);

  const handleremove = async (productId) => {
    dispatch(Removeproduct(productId))
      .unwrap()
      .then(() => {
        toast.success("Product removed successfully");
      })
      .catch((error) => {
        toast.error(error || "Failed to remove product");
      });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (!selectedProduct) return;

    const updatedData = {
      name,
      Category,
      Price,
      quantity,
      Desciption,
      dateAdded: selectedProduct.dateAdded || new Date().toISOString() 
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

  const submitProduct = async (event) => {
    event.preventDefault();
    const productData = { 
      name, 
      Desciption, 
      Category, 
      Price, 
      quantity,
      dateAdded: new Date(dateAdded).toISOString() 
    };

    dispatch(Addproduct(productData))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully");
        resetForm();
      })
      .catch(() => {
        toast.error("Product add unsuccessful");
      });
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setDesciption("");
   
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setCategory(product.Category?._id || "");
    setPrice(product.Price);
    setQuantity(product.quantity);
    setDesciption(product.Desciption);
  
   
    setIsFormVisible(true);
  };

  const displayProducts = query.trim() !== "" ? searchdata : getallproduct;

  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />

      <div className="mt-10 flex">
        <div className="bg-blue-950 w-56 rounded-xl ml-10 block h-24">
          <h1 className="text-white ml-12 block pt-5 font-bold">Total Product</h1>
          <p className="text-white font-bold pt-2 ml-24">{getallproduct?.length || "0"}</p>
        </div>
        <div className="bg-blue-950 ml-10 rounded-xl block w-56 h-24">
          <h1 className="text-white font-bold ml-12 pt-5">Total store value</h1>
          <p className="text-white font-bold pt-2 ml-24">$
            {getallproduct?.reduce((totalAmount, product) => {
              return totalAmount + product.Price;
            }, 0) || "0"}
          </p>
        </div>
        <div className="bg-blue-950 bg-base-100 w-56 rounded-xl ml-10 block h-24">
          <h1 className="text-white font-bold ml-12 pt-5">Total Category</h1>
          <p className="text-white font-bold pt-2 ml-24"> {getallCategory?.length || "0"}</p>
        </div>
      </div>

      <div className="mt-12 ml-5">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setquery(e.target.value)}
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
            <IoMdAdd className="text-xl mr-2" /> Add Product
          </button>
        </div>

        {isFormVisible && (
          <div className="absolute top-16 bg-gray-100 right-0 h-svh p-6 border-2 border-gray-300 rounded-lg shadow-md transition-transform transform">
            <div className="text-right">
              <MdKeyboardDoubleArrowLeft
                onClick={() => setIsFormVisible(false)}
                className="cursor-pointer text-2xl"
              />
            </div>

            <h1 className="text-xl font-semibold mb-4">
              {selectedProduct ? "Edit Product" : "Add Product"}
            </h1>

            <form onSubmit={selectedProduct ? handleEditSubmit : submitProduct}>
              <div className="mb-4">
                <label>Name</label>
                <input
                  value={name}
                  placeholder="Enter product name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label>Category</label>
                <select
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                >
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
                <input
                  value={Desciption}
                  placeholder="Enter product description"
                  onChange={(e) => setDesciption(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                  min="0"
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
                  required
                  min="0"
                />
              </div>

              

              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
              >
                {selectedProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-base-100 border mb-24 border-gray-200 rounded-lg shadow-md">
              <thead className="">
                <tr>
                  <th className="px-3 py-2 border w-5">#</th>
                  <th className="px-3 py-2 border">Name</th>
                  <th className="px-3 py-2 border">Category</th>
                  <th className="px-3 py-2 border">Description</th>
                  <th className="px-3 py-2 border">Quantity</th>
                  <th className="px-3 py-2 border">Price</th>
                  <th className="px-3 py-2 border">Date </th>
                  <th className="px-3 py-2 w-72 border">Operations</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(displayProducts) &&
                displayProducts.length > 0 ? (
                  displayProducts.map((product, index) => {
                    // Format the date for display
                    const formattedDate = product.dateAdded 
                      ? new Date(product.dateAdded).toLocaleDateString() 
                      : 'N/A';
                    
                    return (
                      <tr key={product._id}>
                        <td className="px-3 py-2 border">{index+1}</td>
                        <td className="px-3 py-2 border">{product.name}</td>
                        <td className="px-3 py-2 border">
                          {product.Category?.name || "No Category"}
                        </td>
                        <td className="px-3 py-2 border">
                          {product.Desciption}
                        </td>
                        <td className="px-3 py-2 border">{product.quantity}</td>
                        <td className="px-3 py-2 border">${product.Price}</td>
                        <td className="px-3 py-2 border"><FormattedTime timestamp={product?.createdAt} /></td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleremove(product._id)}
                            className="h-10 w-24 bg-red-500 hover:bg-red-700 rounded-md text-white"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => handleEditClick(product)}
                            className="h-10 w-24 bg-green-500 ml-10 hover:bg-green-700 rounded-md text-white"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No products found.
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

export default Productpage;