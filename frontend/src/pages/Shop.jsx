import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  // Toggle mobile filter visibility
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const FilterPanel = () => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-center mb-6 text-pink-400">Filters</h2>

      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="text-md font-semibold border-b border-gray-700 pb-2 mb-4 flex items-center">
          <span className="mr-2">📂</span> Categories
        </h3>
        <div className="space-y-3 pl-1">
          {categories?.map((c) => (
            <div key={c._id} className="flex items-center space-x-3 hover:bg-gray-800 py-1 px-2 rounded-md transition-colors">
              <input
                type="checkbox"
                id={c._id}
                onChange={(e) => handleCheck(e.target.checked, c._id)}
                className="w-4 h-4 accent-pink-500"
              />
              <label htmlFor={c._id} className="text-sm cursor-pointer w-full">
                {c.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="mb-8">
        <h3 className="text-md font-semibold border-b border-gray-700 pb-2 mb-4 flex items-center">
          <span className="mr-2">🏷️</span> Brands
        </h3>
        <div className="space-y-3 pl-1">
          {uniqueBrands?.map((brand) => (
            <div key={brand} className="flex items-center space-x-3 hover:bg-gray-800 py-1 px-2 rounded-md transition-colors">
              <input
                type="radio"
                id={brand}
                name="brand"
                onChange={() => handleBrandClick(brand)}
                className="w-4 h-4 accent-pink-500"
              />
              <label htmlFor={brand} className="text-sm cursor-pointer w-full">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="text-md font-semibold border-b border-gray-700 pb-2 mb-4 flex items-center">
          <span className="mr-2">💰</span> Price
        </h3>
        <div className="bg-gray-700 rounded-lg p-1">
          <input
            type="text"
            placeholder="Enter Price"
            value={priceFilter}
            onChange={handlePriceChange}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-300 font-semibold shadow-md hover:shadow-lg flex items-center justify-center"
        onClick={() => window.location.reload()}
      >
        <span className="mr-2">↺</span> Reset Filters
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Mobile Filter Toggle Button - Only visible on mobile */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleMobileFilter}
          className="w-full bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
        >
          <span>{isMobileFilterOpen ? "Hide Filters" : "Show Filters"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${isMobileFilterOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Filters (Mobile) */}
        <div className={`${isMobileFilterOpen ? "block" : "hidden"} md:hidden w-full mb-6`}>
          <FilterPanel />
        </div>

        {/* Sidebar - Filters (Desktop) */}
        <div className="hidden md:block md:w-1/4 sticky top-4 self-start">
          <FilterPanel />
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-md">
            <h2 className="text-xl font-bold text-white flex items-center">
              <span className="text-pink-400 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              <span>{products?.length} Products Found</span>
            </h2>
          </div>
          
          {products.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((p) => (
                <div key={p._id} className="transform hover:-translate-y-1 transition-transform duration-300">
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;