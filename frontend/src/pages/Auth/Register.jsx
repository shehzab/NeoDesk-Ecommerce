import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-md mx-auto w-full">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">
              <span className="text-pink-500">Neo</span>
              <span className="text-blue-500">Desk</span>
            </h1>
            <p className="text-gray-400 mt-2">Your premium shopping destination</p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>
            
            <form onSubmit={submitHandler}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300 flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Registering</span>
                    <Loader />
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  className="text-pink-400 hover:text-pink-300 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - E-commerce Features */}
      <div className="hidden md:block w-1/2 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/20" />
        
        {/* Product Showcase */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            {/* Decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500/10 animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 animate-pulse" style={{ animationDelay: "1s" }} />
            
            {/* E-commerce features */}
            <div className="absolute inset-0 flex flex-col justify-center p-16">
              <h2 className="text-3xl font-bold mb-8 text-white">Create an account to enjoy</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-pink-500 to-pink-600 p-3 rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Personal Account</h3>
                    <p className="text-gray-300 mt-1">Save your favorite items and shopping preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Order History</h3>
                    <p className="text-gray-300 mt-1">Track and review your previous purchases</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Special Discounts</h3>
                    <p className="text-gray-300 mt-1">Get access to member-only deals and offers</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Quick Checkout</h3>
                    <p className="text-gray-300 mt-1">Save shipping and payment info for faster shopping</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Sign up now and get <span className="text-yellow-400 font-bold">15% OFF</span> your first order!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;