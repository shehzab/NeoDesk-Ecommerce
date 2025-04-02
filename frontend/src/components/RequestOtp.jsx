import { useState } from "react";
import axios from "axios";

const RequestOTP = () => {
  const [email, setEmail] = useState("");

  const handleRequestOTP = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/request-otp", { email });
      alert("OTP has been sent to your email.");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleRequestOTP}>Get OTP</button>
    </div>
  );
};

export default RequestOTP;
