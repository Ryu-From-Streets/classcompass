import React, { useState } from "react";
import {
  HiUser,
  HiOutlineLockClosed,
  HiMail,
  HiOutlineAcademicCap,
  HiBookOpen,
  HiOutlineGlobe,
} from "react-icons/hi";
import "./login.css";

import axios from "axios";


const SignUpPage = ({ isShowLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [numCredits, setCredits] = useState("");
  const [courses, setCourses] = useState([]);
  const [majors, setMajors] = useState([]);

  const handleSignup= async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }
    if (isNaN(numCredits) || numCredits <= 0 || numCredits > 150) {
      alert("Please enter a valid number of credits (1 to 150)");
      return;
    }
    const spaceIndex = name.indexOf(" ");

    let first_name, last_name;

    if (spaceIndex !== -1) {
      first_name = name.slice(0, spaceIndex);
      last_name = name.slice(spaceIndex + 1);
    } else {
      first_name = name;
      last_name = "";
    }
    if (userType === "student") {
      try {
        const response = await axios.post("/students/signup", {
          first_name: first_name,
          last_name: last_name,
          email: email,
          major: majors,
          credits: numCredits,
          courses_taken: courses,
          password: password
        });
        document.cookie = `authToken=${response.data.token}; path=/;`;
        // Redirect to home page
        window.location.href = "/"; 
      } catch (error) {
        console.error("Failed to sign up student", error.response.data);
      }
    }
    else {
      try {
        const response = await axios.post("/advisors/signup", {
          first_name,
          last_name,
          email,
          password,
        });
        console.log("Advisor signed up successfully", response.data);
      } catch (error) {
        console.error("Failed to sign up advisor", error.response.data);
      }
    }


  };
  const handleNumCreditsChange = (e) => {
    const value = parseInt(e.target.value);
    setCredits(isNaN(value) ? "" : value); // Set numCredits to 0 if NaN is detected
  };

  const handleCoursesChange = (e) => {
    const coursesList = e.target.value
      .split(",")
      .map((course) => course.trim());
    setCourses(coursesList);
  };

  const handleMajors = (e) => {
    const majorList = e.target.value.split(",").map((major) => major.trim());
    setMajors(majorList);
  };

  return (
    <div className="login-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
       <div className="input-container">
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
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <HiUser className="icon" />
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
            value={numCredits}
            onChange={(e) => {
              handleNumCreditsChange(e);
            }}
            required
          />
          <HiOutlineAcademicCap className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter courses"
            value={courses.join(",")}
            onChange={handleCoursesChange}
            required
          />
          <HiBookOpen className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter Majors"
            value={majors.join(",")}
            onChange={handleMajors}
            required
          />
          <HiOutlineGlobe className="icon" />
        </div>

        <button type="submit" className="button">
          {" "}
          Sign Up{" "}
        </button>
      </div>
      </form>
    </div>
  );
};

export default SignUpPage;