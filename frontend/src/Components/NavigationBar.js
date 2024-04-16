import "./NavigationBar.css";

import { NavLink } from "react-router-dom";

/* Adapted from: https://www.codevertiser.com/reactjs-responsive-navbar/ */

const NavigationBar = () => {
    return (
        <nav className="NavigationBar">
            <div className="NavigationBarContainer">
                <div className="Logo">
                    <h1>Class Compass</h1>
                </div>
                <div className="NavigationElements">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/advisors">Advisors</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
 
export default NavigationBar;
