import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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
    setShowSettings(false); // Close settings when opening profile popup
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowProfilePopup(false); // Close profile popup when opening settings
  };


  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader(); 
      reader.onload = (e) => {
        const pdfContent = e.target.result; // confusion: how to handle???
      };
    }
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
                {showProfilePopup && !showSettings && (
                  <div className="ProfilePopup">
                    <div className="ProfileHeader">
                      <HiOutlineUserCircle className="profileIcon" />
                      <h3>{getCookie("name")}</h3>
                    </div>
                    <ul>
                      <li onClick={toggleSettings}>Settings</li>
                      <li onClick={handleLogout}>Sign Out</li>
                    </ul>
                  </div>
                )}
                {showSettings && (
                  <div className="SettingsPopup">
                    <ul>
                      {/* Input element for uploading PDF */}
                      <li>
                        <label htmlFor="pdfUpload">Upload PDF</label>
                        <input
                          type="file"
                          id="pdfUpload"
                          accept=".pdf"
                          onChange={handlePDFUpload}
                        />
                      </li>
                      <li onClick={toggleProfilePopup}>Close Settings</li>
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
