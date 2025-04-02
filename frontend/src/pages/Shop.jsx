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

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Filters */}
        <div className="bg-gray-900 text-white p-5 rounded-lg shadow-md w-full md:w-1/4">
          <h2 className="text-lg font-semibold text-center mb-4">Filters</h2>

          {/* Categories Filter */}
          <div className="mb-6">
            <h3 className="text-md font-semibold border-b pb-2 mb-3">
              Categories
            </h3>
            {categories?.map((c) => (
              <div key={c._id} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 accent-pink-500"
                />
                <label htmlFor={c._id} className="text-sm">
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          {/* Brands Filter */}
          <div className="mb-6">
            <h3 className="text-md font-semibold border-b pb-2 mb-3">Brands</h3>
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 accent-pink-500"
                />
                <label htmlFor={brand} className="text-sm">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="text-md font-semibold border-b pb-2 mb-3">Price</h3>
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 text-black rounded-lg focus:ring focus:border-pink-500"
            />
          </div>

          {/* Reset Button */}
          <button
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">
            {products?.length} Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
