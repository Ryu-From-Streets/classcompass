import React, {useState} from "react"
import {
  HiMail,
  HiOutlineLockClosed,
} from "react-icons/hi";

import "./login.css"
import { Link } from "react-router-dom";

const LoginPage = ({isShowLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [userType, setUserType] = useState("student");
    const handleLogin = (e) => {
       
    };
    return (
      <div className="login-page">
        <h2>Login</h2> 
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="student">I am a student</option>
              <option value="advisor">I am an advisor</option>
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
          <div className="forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link to="/forgot">Forgot Password?</Link>
          </div>
          <button type="submit" className="button">
            {" "}
            Login{" "}
          </button>
          <div className="register">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    );
}

export default LoginPage;
