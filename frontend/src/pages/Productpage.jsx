import React, { useEffect, useState } from 'react';
import TopNavbar from '../Components/TopNavbar';
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md"; // Import the back/remove icon
import { useDispatch, useSelector } from "react-redux";
import { Addproduct, getallproducts } from '../features/productSlice';
import { FaImage } from "react-icons/fa";
import toast from 'react-hot-toast';

function Productpage() {
  const { getallproduct, isproductadd } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [Price, setPrice] = useState("");
  const [quantity, setquantity] = useState("");
  const [Description, setDescription] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    dispatch(getallproducts);
  }, [dispatch]);


  const productData={
    name, Description, Price, quantity
  }
  const submitproduct = async (event) => {
    event.preventDefault(); 

    dispatch(Addproduct(productData))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully");
      })
      .catch((error) => {
        toast.error("Product add unsuccessful");
      });
  };

  const handleAddProductClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleRemoveForm = () => {
    setIsFormVisible(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) {
      toast.error("Error, file not found");
    }
    setIsDragOver(false);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedFile(base64Image);
      try {
        toast.success('Profile updated successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
      }
    };
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div>
      <TopNavbar />

      <div className="mt-10 ml-5 h-full">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter your product"
          />
          <button
            onClick={handleAddProductClick}
            className="bg-blue-800 flex items-center justify-center text-white w-40 h-12 rounded-lg hover:bg-blue-700 transition duration-200 px-4"
          >
            <IoMdAdd className="text-xl mr-2" /> Add Product
          </button>
        </div>

        <div
          className={`${
            isFormVisible ? 'translate-x-0 right-1' : 'translate-x-full'
          } absolute top-10 bg-gray-100 right-0  h-svh transform transition-all duration-500 ease-in-out mt-6 p-6 border-2 border-gray-300 rounded-lg shadow-md`}
        >
          <div className="text-right">
            <MdKeyboardDoubleArrowLeft
              onClick={handleRemoveForm}
              className="cursor-pointer text-2xl text-black"
            />
          </div>

          <h1 className="text-xl mt-10 font-semibold mb-4">Add Product</h1>

         
            <div className="mb-4">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="text"
                placeholder="Name of product"
                required
                className="w-full h-10 px-2 border-2 rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <label>Description</label>
              <input
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Description of product"
                required
                className="w-full h-10 px-2 border-2 rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <label>Price</label>
              <input
                type="number"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price of product"
                required
                className="w-full h-10 px-2 border-2 rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setquantity(e.target.value)}
                placeholder="Quantity of product"
                required
                className="w-full h-10 px-2 border-2 rounded-lg mt-2"
              />
            </div>

            <div className="mb-4">
              <div
                className={`w-full mt-16 h-32 border-2 border-dashed ${
                  isDragOver ? 'border-blue-500' : 'border-gray-300'
                } rounded-lg flex flex-col items-center justify-center transition-colors duration-200`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <FaImage className="text-4xl text-gray-500 mb-2 " />
                <p className="text-gray-600 text-center">
                  {selectedFile
                    ? selectedFile.name
                    : 'Drag & drop an image, or click to select one'}
                </p>
                <input
                  type="file"
                  className="hidden "
                  id="fileInput"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  className="text-blue-500 cursor-pointer mt-2"
                >
                  Browse
                </label>
              </div>
            </div>

            <button
              onClick={submitproduct }
              className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
            >
              {isproductadd ? "Adding product..." : "Add Product"}
            </button>
  
        </div>
      </div>
    </div>
  );
}

export default Productpage;
