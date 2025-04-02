import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRequestOTP = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/request-otp", { email });
      alert("OTP sent successfully");
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 text-gray-900 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRequestOTP}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;