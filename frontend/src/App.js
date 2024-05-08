import './App.css';
import './Components/NodeTree.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


// PAGES
import HomePage from "./Pages/HomePage";
import AdvisorsPage from './Pages/AdvisorsPage';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import TreePage from "./Pages/TreePage";
import ForgotPage from "./Pages/ForgotPage";
import EditCoursePage from './Pages/EditCoursePage';
import AddCoursePage from './Pages/AddCoursePage';

// COMPONENTS
import NavigationBar from "./Components/NavigationBar";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />

        <div className="Pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/advisors" element={<AdvisorsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tree" element={<TreePage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/editCourse" element={<EditCoursePage />} />
            <Route path="/addCourse" elemtn={<AddCoursePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;