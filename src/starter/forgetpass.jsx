import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './forgetpass.css';

export const Forgetpass = () => {
  const [showOtpForm, setShowOtpForm] = useState(true);
  const [emaildata, setEmailData] = useState({ email: '' });
  const [otp, setOtp] = useState(''); 
  const navigate = useNavigate();

  // ✅ Base URL variable (easy to change later)
  const url = "https://backend-stud-ws6b.vercel.app";

  // Email input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ [name]: value });
  };

  // Send OTP Request
  const handleForget = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/send-otp`, {
        email: emaildata.email,
        code: "leo"
      });

      if (res.data.success) {
        setShowOtpForm(false);      
        alert("OTP Sent Successfully!");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to send OTP");
    }
  };

  // Verify OTP
  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/send-otp`, {
        email: emaildata.email,
        code: otp   
      });

      if (res.data.success) {
        alert("OTP Verified");
        navigate("/resetpass", { state: { emaildata } });
      }
    } catch (err) {
      alert(err.response?.data?.detail || "OTP verification failed");
    }
  };

  return (
    <div className="forget-container">
      <div className="forget-card">
        {/* Header Section */}
        <h2 className="forget-title">Forgot Password</h2>
       
        {showOtpForm ? (
          // Forget Section 
          <form className="forget-detail" onSubmit={handleForget}>
            <p className="forget-subtitle">
              Please Enter Your Email Address To Receive a Verification Code.
            </p>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="forget-input"
              value={emaildata.email}
              onChange={handleInputChange}
              required
            />
            <button className="forget-btn">Send</button>
          </form>
        ) : (
          // OTP Section
          <form className="otp-cont" onSubmit={handleOtp}>
            <p className="otp-tittle">Enter Your OTP</p>
            <input
              type="text"
              className="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button className="otp-btn">Verify</button>
            <p
              className="otp-resend"
              onClick={handleForget}
              style={{ cursor: "pointer" }}
            >
              Try another way
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
