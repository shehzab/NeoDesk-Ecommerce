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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sticky Branding Bar with improved styling */}
      <div className="fixed top-0 w-full py-4 z-50 bg-gray-900/90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            <span className="text-pink-500">Neo</span><span className="text-blue-400">Desk</span>
          </h1>
        </div>
      </div>

      {/* Content container with proper spacing */}
      <div className="pt-20">
        {!keyword && <Header />}

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : error ? (
          <div className="container mx-auto px-4 py-8">
            <Message variant="danger">
              {error?.data?.message || "Failed to fetch products. Please try again."}
            </Message>
          </div>
        ) : (
          <>
            {/* Hero Section with gradient background */}
            <div className="relative w-full h-[550px] bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center text-center px-4">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-400">
                  Welcome to NeoDesk
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                  Discover the latest collections at the best prices, with premium quality and exclusive designs.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/shop"
                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 font-medium rounded-full py-3 px-8 text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/categories"
                    className="bg-transparent border-2 border-blue-400 hover:bg-blue-400/10 font-medium rounded-full py-3 px-8 text-lg transition-all duration-300"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>
            </div>

            {/* Banner Section with improved styling */}
            <div className="w-full py-16 bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col items-center justify-center text-center px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-bold">Elevate Your Style</h2>
                <p className="mt-6 text-lg sm:text-xl text-gray-300">
                  Handpicked fashion collections tailored for you, created with attention to detail and premium materials.
                </p>
                <Link
                  to="/shop"
                  className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 transition font-medium rounded-full py-3 px-8 text-lg"
                >
                  Explore Collections
                </Link>
              </div>
            </div>

            {/* Featured Products Section */}
            <section className="py-20 bg-gray-900">
              <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                  <h2 className="text-4xl sm:text-5xl font-bold text-center">
                    Featured Products
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-400 rounded-full mt-4"></div>
                  <p className="mt-6 text-gray-300 text-lg text-center max-w-2xl">
                    Our most popular items, hand-selected for quality and style
                  </p>
                </div>

                {data?.products?.length === 0 ? (
                  <Message variant="info">No products found.</Message>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {data.products.map((product) => (
                      <div
                        key={product._id}
                        className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/10"
                      >
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-center mt-12">
                  <Link 
                    to="/shop" 
                    className="flex items-center gap-2 bg-transparent border border-pink-500 hover:bg-pink-500/10 text-pink-500 px-6 py-3 rounded-full transition-all duration-300"
                  >
                    View All Products
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
            
            {/* Features Section (New) */}
            <section className="py-16 bg-gray-800">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-900 p-8 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Free Shipping</h3>
                    <p className="text-gray-400">On all orders over $50. International shipping available on selected items.</p>
                  </div>
                  
                  <div className="bg-gray-900 p-8 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Secure Payments</h3>
                    <p className="text-gray-400">All transactions are secure and encrypted. We accept all major credit cards.</p>
                  </div>
                  
                  <div className="bg-gray-900 p-8 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">30-Day Returns</h3>
                    <p className="text-gray-400">Not satisfied with your purchase? Return it within 30 days for a full refund.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Newsletter Section (New) */}
            <section className="py-16 bg-gradient-to-br from-pink-500/20 to-blue-500/20">
              <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
                  <p className="text-gray-300 mb-8">
                    Get the latest updates, exclusive offers, and special deals delivered directly to your inbox.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-grow px-6 py-3 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 px-8 py-3 rounded-full font-medium transition-all duration-300"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {/* Footer with improved styling */}
            <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-16">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      <span className="text-pink-500">Neo</span><span className="text-blue-400">Desk</span>
                    </h2>
                    <p className="mb-6">Your destination for premium fashion trends and exclusive designs.</p>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500/20 hover:text-pink-500 transition-all duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500/20 hover:text-pink-500 transition-all duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500/20 hover:text-pink-500 transition-all duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                    <ul className="space-y-4">
                      <li><Link to="/shop" className="hover:text-pink-500 transition-colors">Shop All</Link></li>
                      <li><Link to="/categories" className="hover:text-pink-500 transition-colors">Categories</Link></li>
                      <li><Link to="/about-contact" className="hover:text-pink-500 transition-colors">About Us</Link></li>
                      <li><Link to="/about-contact" className="hover:text-pink-500 transition-colors">Contact</Link></li>
                      <li><Link to="/faq" className="hover:text-pink-500 transition-colors">FAQ</Link></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pink-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>123 Fashion Street, Design District, 10001</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pink-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>support@neodesk.com</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pink-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>+1 (555) 123-4567</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                  <p className="text-sm">&copy; {new Date().getFullYear()} NeoDesk. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;