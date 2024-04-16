import "./NavigationBar.css";

import { NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";

/* Adapted from: https://www.codevertiser.com/reactjs-responsive-navbar/ */

const NavigationBar = () => {
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

            <li>
              <NavLink to="/advisors">Advisors</NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <HiOutlineUserCircle className="icon" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
 
export default NavigationBar;