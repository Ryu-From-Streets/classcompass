import React, { useState } from "react";
import {
  HiUser, HiOutlineLockClosed,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import "./login.css";

const SignUpPage = ({ isShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userType, setUserType] = useState("student");
  const handleSignup= (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }

  };
  return (
    <div className="login-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="input-box">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student"> I am a student </option>
            <option value="advisor"> I am an advisor </option>
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
          <HiUser className="icon" />
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
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter number of credits"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <HiOutlineAcademicCap className="icon" />
        </div>
        <button type="submit" className="button">
          {" "}
          Sign Up{" "}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
