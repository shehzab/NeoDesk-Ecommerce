import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>     
      {/*  Sticky Branding Bar */}
     <div className="fixed top-0 w-full text-center py-4 z-50  shadow-md">
        <h1 className="text-3xl font-bold sm:text-4xl">
          <span className="text-pink-500">Neo</span><span className="text-blue-400">Desk</span>
        </h1>
      </div>

      {/* Add Margin to Push Content Below the Branding Bar */}
      <div className="mt-24 sm:mt-32">
        {/* Banner Section */}
        <div className="w-full h-[250px] sm:h-[300px] bg-black flex flex-col items-center justify-center text-center text-white px-6">
          <h2 className="text-4xl sm:text-5xl font-bold">Elevate Your Style</h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-400">
            Handpicked fashion collections tailored for you.
          </p>
          <Link
            to="/shop"
            className="mt-6 bg-blue-500 hover:bg-blue-600 transition font-bold rounded-full py-3 px-8 text-lg sm:text-xl"
          >
            Explore Collections
          </Link>
        </div>
      </div>

      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || "Failed to fetch products. Please try again."}
        </Message>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative w-full h-[450px] sm:h-[500px] bg-gray-800 flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-5xl sm:text-6xl font-bold">Welcome to NeoDesk</h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300">
              Discover the latest collections at the best prices.
            </p>
            <Link
              to="/shop"
              className="mt-6 bg-pink-600 hover:bg-pink-700 transition font-bold rounded-full py-3 px-10 text-lg sm:text-xl"
            >
              Shop Now
            </Link>
          </div>

          {/* Featured Products Section */}
          <section className="py-16 bg-transparent">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-400 text-center mb-10">
                Featured Products
              </h2>

              {data?.products?.length === 0 ? (
                <Message variant="info">No products found.</Message>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {data.products.map((product) => (
                    <div
                      key={product._id}
                      className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 p-4"
                    >
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-400 py-10 mt-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold"><span className="text-pink-500">Neo</span><span className="text-blue-400">Desk</span></h2>
            <p className="mt-2 text-sm sm:text-base">Your destination for premium fashion trends.</p>
            <div className="mt-6 flex justify-center space-x-6">
              <Link to="/about-contact" className="hover:text-white text-sm sm:text-base">About Us</Link>
              <Link to="/about-contact" className="hover:text-white text-sm sm:text-base">Contact</Link>
              <Link to="/faq" className="hover:text-white text-sm sm:text-base">FAQ</Link>
            </div>
            <p className="mt-6 text-xs sm:text-sm">&copy; {new Date().getFullYear()} NeoDesk. All rights reserved.</p>
          </footer>
        </>
      )}
    </>
  );
};

export default Home;
