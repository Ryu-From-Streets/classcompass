import React, {useState} from "react"


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();
        // Simulated authentication logic
        if (email === "example@example.com" && password === "password") {
          // Successful login
          console.log("Login successful!");
          // You can redirect the user or perform any other actions here
        } else {
          // Failed login
          setError("Invalid email or password");
        }
  };
    };
    return (
      <div className="LoginPage">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type = "submit"> Login </button>
        </form>
      </div>
    );
}

export default LoginPage;
