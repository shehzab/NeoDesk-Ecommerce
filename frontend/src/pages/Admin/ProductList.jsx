import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { UploadCloud, Package, X } from "lucide-react";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const clearImage = () => {
    setImage("");
    setImageUrl(null);
  };

  return (
    <div className="flex bg-black min-h-screen text-gray-200">
      {/* Admin Menu */}
      <AdminMenu />
      
      {/* Main Content Area - Adjusted to prevent navbar overlap */}
      <div className="flex-1 p-4 md:pl-12 md:pr-8 lg:pl-16 lg:pr-12">
        <div className="w-full flex flex-col items-center mt-10">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white flex justify-center items-center gap-2">
              <Package size={24} className="text-purple-500" />
              Create New Product
            </h1>
            <p className="text-gray-400">Add a new product to your inventory</p>
          </div>
        </div>


        <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-4 md:p-6 mx-auto w-full max-w-5xl">
          {/* Image Upload Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Product Image</h2>
            
            {imageUrl ? (
              <div className="relative w-full max-w-sm mx-auto">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <button 
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 transition-colors"
                  >
                    <X size={18} />
                  </button>
                  <img
                    src={imageUrl}
                    alt="product"
                    className="rounded-md max-h-[180px] mx-auto"
                  />
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-gray-700 hover:border-purple-500 transition-colors bg-gray-800 px-4 py-6 block w-full max-w-sm mx-auto text-center rounded-lg cursor-pointer">
                <div className="flex flex-col items-center">
                  <UploadCloud size={40} className="text-purple-500 mb-2" />
                  <span className="text-lg font-medium text-white">Upload Product Image</span>
                  <span className="text-sm text-gray-400 mt-1">Click or drag and drop</span>
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Form Section - Adjusted for better spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Count In Stock</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Brand</label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select a category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  placeholder="Enter product description"
                  rows="4"
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold text-white shadow-lg transition-all transform hover:scale-105"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;