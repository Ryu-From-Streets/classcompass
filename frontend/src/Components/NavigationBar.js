import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  useEffect(() => {
    const authToken = getCookie("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const handleLogout = () => {
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setShowProfilePopup(false);
  };

  return (
    <nav className="NavigationBar">
      <div className="NavigationBarContainer">
        <div className="Logo">
          <NavLink to="/" exact>
            <h1>Class Compass</h1>
          </NavLink>
        </div>
        <div className="NavigationElements">
          <ul>
            {isLoggedIn ? (
              <li>
                <button onClick={toggleProfilePopup}>
                  <HiOutlineUserCircle className="icon" />
                </button>
                {showProfilePopup && (
                  <div className="ProfilePopup">
                    <div className="ProfileHeader">
                      <HiOutlineUserCircle className="profileIcon" />
                      <h3>John Doe</h3>
                    </div>
                    <ul>
                      <li>Profile</li>
                      <li>Settings</li>
                      <li onClick={handleLogout}>Sign Out</li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <NavLink to="/login">
                  <HiOutlineUserCircle className="icon" />
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
