import React, {useState} from "react"


const RegisterPage = () => {
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [credits, setCredits] = useState(0); 
    const [password, setPassword] = useState("");
    const [re_password, setRePassword] = useState("");

    const handleSignUp = (e) => {
        //auth logic
    };
    return (
      <div className="LoginPage">
        <h2>Login</h2>
        <form onSubmit={handleSignUp}>
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


export default RegisterPage;