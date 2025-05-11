import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      console.log("Login response:", res);
      dispatch(setCredentials({ ...res }));
      
      // Check if user is admin and redirect accordingly
      if (res.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate(redirect);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
            <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>
            
            <form onSubmit={submitHandler}>
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
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-gray-300 text-sm font-medium">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-pink-400 hover:text-pink-300">
                    Forgot Password?
                  </Link>
                </div>
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

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all duration-300 flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Signing In</span>
                    <Loader />
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-pink-400 hover:text-pink-300 font-medium"
                >
                  Create an Account
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
              <h2 className="text-3xl font-bold mb-8 text-white">Sign in to enjoy</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-pink-500 to-pink-600 p-3 rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Exclusive Deals</h3>
                    <p className="text-gray-300 mt-1">Members-only discounts on premium products</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Personalized Recommendations</h3>
                    <p className="text-gray-300 mt-1">Discover products tailored to your style</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Express Checkout</h3>
                    <p className="text-gray-300 mt-1">Faster shopping with saved preferences</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">Order Tracking</h3>
                    <p className="text-gray-300 mt-1">Real-time updates on your purchases</p>
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
                    <p className="text-white font-medium">New members get <span className="text-yellow-400 font-bold">15% OFF</span> their first order!</p>
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

export default Login;