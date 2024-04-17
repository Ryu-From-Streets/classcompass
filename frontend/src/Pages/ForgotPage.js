import React, { useState } from "react";
import { HiMail, HiOutlineLockClosed } from "react-icons/hi";

import "./login.css";

const LoginPage = ({ isShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleReset = (e) => {
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }
  };
  return (
    <div className="login-page">
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
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
