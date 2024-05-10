import React, { useState } from "react";
import { HiMail, HiOutlineLockClosed } from "react-icons/hi";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ isShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState("student");
  const [error, setError] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/${userType}s/signin`, {
        email: email,
        password: password,
      });
      console.log(response.data);
      document.cookie = `authToken=${response.data.token}; path=/;`;
      document.cookie = `name=${response.data.name}; path=/;`;
      document.cookie = `userType=${userType}; path=/;`;
      document.cookie = `userID=${response.data.id}; path=/;`;
      window.location.href = "/";
    } catch (error) {
    if (error.response && error.response.status === 404) {
      setError("Incorrect email or password.");
    } else if (error.response && error.response.status === 401) {
      setError("Incorrect email or password.");
    } else {
      setError("An error occurred. Please try again later.");
    }
  }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Welcome!</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <div className="input-box">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="student">I am a student</option>
                {/*<option value="advisor">I am an advisor</option>*/}
              </select>
            </div>
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
          </div>
          <div className="forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link to="/forgot">
              Forgot Password?
            </Link>
          </div>
          {error && <div className="error-message">{error}</div>}{" "}
          <button type="submit" className="button">
            Login
          </button>
          <div className="register">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
