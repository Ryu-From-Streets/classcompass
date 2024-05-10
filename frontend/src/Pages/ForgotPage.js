import React, { useState } from "react";
import { HiMail, HiOutlineLockClosed } from "react-icons/hi";
import { MdSecurity } from "react-icons/md";
import "./login.css";
import axios from "axios";

const LoginPage = ({ isShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [error, setError] = useState("");
  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userType = getCookie("userType");
      const response = await axios.post(`/${userType}s/forgot`, {
        email: email,
        password: password,
        question: securityQuestion,
        answer: securityAnswer,
      });
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found.");
      } else {
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
              <select
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
              >
                <option value="">Select Security Question</option>
                <option value="What is your pet's name?">
                  What is your pet's name?
                </option>
                <option value="Where were you born?">
                  Where were you born?
                </option>
                <option value="What is your mother's name?">
                  What is your mother's name?
                </option>
                <option value="What is your father's name?">
                  What is your father's name?
                </option>
              </select>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter Answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
              <MdSecurity className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter New Password"
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
