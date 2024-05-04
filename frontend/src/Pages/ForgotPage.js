import React, { useState } from "react";
import { HiMail, HiOutlineLockClosed } from "react-icons/hi";

import "./login.css";
import axios from "axios";

const LoginPage = ({ isShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userType = getCookie("userType"); // Get userType cookie
      const response = await axios.post(`/${userType}s/reset-password`, {
        email: email,
        password: password,
      });
        console.log(response.data);
      }catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found.");
      }else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

    const getCookie = (name) => {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return "";
  };
  return (
    <div className="login-page">
      <div className="form">
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <div className="input-container">
            <div className="input-box">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <HiMail className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <HiOutlineLockClosed className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Re enter Password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
              <HiOutlineLockClosed className="icon" />
            </div>
            <button type="submit" className="button">
              {" "}
              Reset Password{" "}
            </button>
            {error && <p className="error">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
