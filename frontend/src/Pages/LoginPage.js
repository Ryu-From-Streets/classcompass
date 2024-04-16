import React, {useState} from "react"
import { CiUser, CiLock } from "react-icons/ci";
import "./login.css"

const LoginPage = ({isShowLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = (e) => {
       
    };
    return (
      <div className="login-page">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <CiUser className="icon" />
          </div>
          <br></br>
          <div className="input-box">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <CiLock className="icon" />
          </div>
          <div className="forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit"> Login </button>
          <div className="register">
            <p>Don't have an account?</p> <a href="#">Register</a>
          </div>
        </form>
      </div>
    );
}

export default LoginPage;
