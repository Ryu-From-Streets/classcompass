import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


// PAGES
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import TreePage from "./Pages/TreePage";

// COMPONENTS
import NavigationBar from "./Components/NavigationBar";


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <NavigationBar />

        <div className="Pages">
          <Routes>
            <Route 
              path="/"
              element={<HomePage/>}
            />
            <Route 
              path="/login"
              element={<LoginPage/>}
            />
            <Route 
              path="/register"
              element={<RegisterPage/>}
            />
            <Route
              path="/tree"
              element={<TreePage/>}
            />
          </Routes>
        </div>

      </BrowserRouter>



    </div>
  );
}

export default App;