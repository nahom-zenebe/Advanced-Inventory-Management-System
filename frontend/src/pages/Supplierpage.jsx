import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import {
  CreateSupplier,
  gettingallSupplier,
  deleteSupplier,
  SearchSupplier,
  EditSupplier,
} from "../features/SupplierSlice";
import toast from "react-hot-toast";
import FormattedTime from "../lib/FormattedTime ";

function Supplierpage() {
  const { getallSupplier, searchdata, editedsupplier } = useSelector(
    (state) => state.supplier
  );
  const { getallproduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [Product, setProduct] = useState("");

  useEffect(() => {
    dispatch(gettingallSupplier());
  }, [dispatch, deleteSupplier, editedsupplier]);

  useEffect(() => {
    if (query.trim() !== "") {
      const timeoutId = setTimeout(() => {
        dispatch(SearchSupplier(query));
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      dispatch(gettingallSupplier());
    }
  }, [query, dispatch]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setAddress("");
    setEmail("");
    setProduct("");
    setSelectedSupplier(null);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (!selectedSupplier) return;

    const updatedData = {
      name,
      contactInfo: {
        phone: Phone,
        email: Email,
        address: Address,
      },
      productsSupplied: [Product],
    };

    dispatch(EditSupplier({ supplierId: selectedSupplier._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Supplier updated successfully");
        setIsFormVisible(false);
        setSelectedSupplier(null);
        resetForm();
      })
      .catch(() => {
        toast.error("Failed to update supplier");
      });
  };

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setName(supplier.name);
    setPhone(supplier.contactInfo?.phone);
    setEmail(supplier.contactInfo?.email);
    setAddress(supplier.contactInfo?.address);
    setProduct(supplier?.productsSupplied._id);
    setIsFormVisible(true);
  };

  const handleRemove = async (SupplierId) => {
    dispatch(deleteSupplier(SupplierId))
      .unwrap()
      .then(() => {
        toast.success("Supplier removed successfully");
      })
      .catch((error) => {
        toast.error(error || "Failed to remove Supplier");
      });
  };

  const submitSupplier = async (event) => {
    event.preventDefault();

    const supplierInfo = {
      name,
      contactInfo: {
        phone: Phone,
        email: Email,
        address: Address,
      },
      productsSupplied: Product,
    };
    dispatch(CreateSupplier(supplierInfo))
      .unwrap()
      .then(() => {
        toast.success("Supplier added successfully");
        resetForm();
        dispatch(gettingallSupplier());
      })
      .catch(() => {
        toast.error("Supplier add unsuccessful");
      });
  };

  const displaySuppliers = query.trim() !== "" ? searchdata : getallSupplier;

  if (!getallSupplier) {
    return <div>Loading suppliers...</div>;
  }

  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />
      <div className="mt-10 ml-5 mb-10">
      <div className="bg-blue-950 w-56 rounded-xl  ml-10 block h-24">
          <h1 className="text-white ml-12 block pt-5 font-bold">Total Supplier</h1>
          <p className="text-white font-bold  pt-2  ml-24">{getallSupplier?.length || "0"}</p>

        </div>
        <div className="flex items-center space-x-4  mt-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg bg-base-100"
            placeholder="Search for supplier"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setSelectedSupplier(null);
              resetForm();
            }}
            className="bg-blue-800 text-white w-40 h-12 rounded-lg flex items-center justify-center"
          >
            <IoMdAdd className="text-xl mr-2" /> Add Supplier
          </button>
        </div>

        {isFormVisible && (
          <div className="absolute top-16 bg-base-100 right-0 h-svh p-6 border-2 border-gray-300 rounded-lg shadow-md transition-transform transform">
            <div className="text-right">
              <MdKeyboardDoubleArrowLeft
                onClick={() => setIsFormVisible(false)}
                className="cursor-pointer text-2xl"
              />
            </div>

            <h1 className="text-xl font-semibold mb-4">
              {selectedSupplier ? "Edit Supplier" : "Add Supplier"}
            </h1>

            <form onSubmit={selectedSupplier ? handleEditSubmit : submitSupplier}>
              <div className="mb-4">
                <label>Name</label>
                <input
                  value={name}
                  placeholder="Enter Supplier name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2 bg-base-100"
                />
              </div>

              <div className="mb-4">
                <label>Phone</label>
                <input
                  value={Phone}
                  placeholder="Enter Supplier Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2 bg-base-100"
                />
              </div>

              <div className="mb-4">
                <label>Email</label>
                <input
                  value={Email}
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2 bg-base-100"
                />
              </div>

              <div className="mb-4">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter Supplier Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2 bg-base-100"
                />
              </div>

              <div className="mb-4">
                <label>Product</label>
                <select
                  value={Product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2 bg-base-100"
                >
                  <option value="">Select a product</option>
                  {getallproduct?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
              >
                {selectedSupplier ? "Update Supplier" : "Add Supplier"}
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Supplier List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-base-100 border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-base-100">
                <tr>
                  <th className="px-3 py-2 border">#</th>
                  <th className="px-3 py-2 border">Name</th>
                  <th className="px-3 py-2 border">Phone</th>
                  <th className="px-3 py-2 border">Email</th>
                  <th className="px-3 py-2 border">Address</th>
                  <th className="px-3 py-2 border">Add time</th>
                  <th className="px-3 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(displaySuppliers) &&
                displaySuppliers.length > 0 ? (
                  displaySuppliers?.map((supplier, index) => (
                    <tr key={supplier._id} className="">
                      <td className="px-3 py-2 border">{index + 1}</td>
                      <td className="px-3 py-2 border">{supplier.name}</td>
                      <td className="px-3 py-2 border">
                        {supplier.contactInfo?.phone}
                      </td>
                      <td className="px-3 py-2 border">
                        {supplier.contactInfo?.email}
                      </td>
                      <td className="px-3 py-2 border">
                        {supplier.contactInfo?.address}
                      </td>
                      <td className="px-3 py-2 border">
                        <FormattedTime timestamp={supplier.createdAt} />
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleRemove(supplier?._id)}
                          className="h-10 w-24 bg-red-500 hover:bg-red-700 rounded-md text-white"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleEditClick(supplier)}
                          className="h-10 w-24 bg-green-500 hover:bg-green-700 rounded-md text-white ml-2"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No Supplier found.
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

export default Supplierpage;