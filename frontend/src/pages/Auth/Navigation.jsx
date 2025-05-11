import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineInfoCircle,
  AiOutlineMenu,
  AiOutlineClose
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [logoutApiCall] = useLogoutMutation();
  
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        className="fixed top-4 left-4 z-50 lg:hidden md:block sm:block p-2 bg-black text-white rounded-md"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>
      
      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black z-40 lg:hidden md:block sm:block flex flex-col p-6 pt-16">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="flex items-center text-white" onClick={() => setShowMobileMenu(false)}>
              <AiOutlineHome className="mr-3" size={24} />
              <span className="text-lg">Home</span>
            </Link>
            
            <Link to="/shop" className="flex items-center text-white" onClick={() => setShowMobileMenu(false)}>
              <AiOutlineShopping className="mr-3" size={24} />
              <span className="text-lg">Shop</span>
            </Link>
            
            <Link to="/about-contact" className="flex items-center text-white" onClick={() => setShowMobileMenu(false)}>
              <AiOutlineInfoCircle className="mr-3" size={24} />
              <span className="text-lg">About Us</span>
            </Link>
            
            <Link to="/cart" className="flex items-center text-white relative" onClick={() => setShowMobileMenu(false)}>
              <AiOutlineShoppingCart className="mr-3" size={24} />
              <span className="text-lg">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 left-5 px-2 py-1 text-xs text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            
            <Link to="/favorite" className="flex items-center text-white" onClick={() => setShowMobileMenu(false)}>
              <FaHeart className="mr-3" size={20} />
              <span className="text-lg">Favorites</span>
              <FavoritesCount />
            </Link>
          </div>
          
          <div className="mt-12">
            {userInfo ? (
              <div className="flex flex-col space-y-4">
                <div className="text-white text-lg font-medium">{userInfo.username}</div>
                <Link to="/profile" className="text-gray-300 hover:text-white" onClick={() => setShowMobileMenu(false)}>
                  Profile
                </Link>
                {userInfo.isAdmin && (
                  <>
                    <Link to="/admin/dashboard" className="text-gray-300 hover:text-white" onClick={() => setShowMobileMenu(false)}>
                      Dashboard
                    </Link>
                    <Link to="/admin/productlist" className="text-gray-300 hover:text-white" onClick={() => setShowMobileMenu(false)}>
                      Products
                    </Link>
                    <Link to="/admin/categorylist" className="text-gray-300 hover:text-white" onClick={() => setShowMobileMenu(false)}>
                      Category
                    </Link>
                    <Link to="/admin/orderlist" className="text-gray-300 hover:text-white" onClick={() => setShowMobileMenu(false)}>
                      Orders
                    </Link>
                    <Link to="/admin/userlist" className="text-gray-300 hover:text-white" onClick={() => setShowMobileMenu(false)}>
                      Users
                    </Link>
                  </>
                )}
                <button onClick={logoutHandler} className="text-red-400 hover:text-red-300 text-left">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link to="/login" className="flex items-center text-white" onClick={() => setShowMobileMenu(false)}>
                  <AiOutlineLogin className="mr-3" size={24} />
                  <span className="text-lg">Login</span>
                </Link>
                <Link to="/register" className="flex items-center text-white" onClick={() => setShowMobileMenu(false)}>
                  <AiOutlineUserAdd className="mr-3" size={24} />
                  <span className="text-lg">Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Desktop Navigation */}
      <div
        style={{ zIndex: 9999 }}
        className={`hidden xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black 
        ${isExpanded ? 'w-60' : 'w-20'} h-screen fixed transition-all duration-300 ease-in-out`}
        id="navigation-container"
        onMouseEnter={() => !isExpanded && toggleExpand()}
        onMouseLeave={() => isExpanded && toggleExpand()}
      >
        <div className="flex flex-col space-y-8 mt-8">
          <Link
            to="/"
            className="flex items-center group hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
          >
            <AiOutlineHome className="mr-3" size={26} />
            <span className={`${isExpanded ? 'block' : 'hidden'} transition-opacity duration-300`}>
              Home
            </span>
          </Link>

          <Link
            to="/shop"
            className="flex items-center group hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
          >
            <AiOutlineShopping className="mr-3" size={26} />
            <span className={`${isExpanded ? 'block' : 'hidden'} transition-opacity duration-300`}>
              Shop
            </span>
          </Link>

          <Link
            to="/about-contact"
            className="flex items-center group hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
          >
            <AiOutlineInfoCircle className="mr-3" size={26} />
            <span className={`${isExpanded ? 'block' : 'hidden'} transition-opacity duration-300`}>
              About Us
            </span>
          </Link>

          <Link 
            to="/cart" 
            className="flex items-center group hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
          >
            <div className="relative">
              <AiOutlineShoppingCart size={26} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
            <span className={`ml-3 ${isExpanded ? 'block' : 'hidden'} transition-opacity duration-300`}>
              Cart
            </span>
          </Link>

          <Link 
            to="/favorite" 
            className="flex items-center group hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
          >
            <div className="relative">
              <FaHeart size={22} />
              <FavoritesCount />
            </div>
            <span className={`ml-3 ${isExpanded ? 'block' : 'hidden'} transition-opacity duration-300`}>
              Favorites
            </span>
          </Link>
        </div>

        <div className={`mb-6 ${isExpanded ? 'px-3' : ''}`}>
          {userInfo ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center w-full justify-between hover:bg-gray-800 px-3 py-2 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="mr-2 font-medium">{userInfo.username}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                  {userInfo.isAdmin && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-800"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 hover:bg-gray-800"
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/categorylist"
                        className="block px-4 py-2 hover:bg-gray-800"
                      >
                        Category
                      </Link>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-gray-800"
                      >
                        Orders
                      </Link>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-gray-800"
                      >
                        Users
                      </Link>
                    </>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Link
                to="/login"
                className="flex items-center hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
              >
                <AiOutlineLogin className="mr-3" size={26} />
                <span className={`${isExpanded ? 'block' : 'hidden'} transition-opacity duration-300`}>
                  Login
                </span>
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
              >
                <AiOutlineUserAdd className="mr-3" size={26} />
                <span className={`${isExpanded ? 'block' : 'hidden'} transition-opacity duration-300`}>
                  Register
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;