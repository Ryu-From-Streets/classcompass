import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// PAGES
import HomePage from "./Pages/HomePage";

// COMPONENTS
import { SearchBar } from './Components/SearchBar';
import { SearchResultsList } from './Components/SearchResultList';


function App() {
  // state for search bar components
  const [results, setResults] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      const response = await fetch("./Test_Data/Courses.json");
      const jsonOfCourses = await response.json();

      if (response.ok) {
        setFilteredCourses(jsonOfCourses);
      }
    };

    fetchAllCourses();
  }, []);

  return (
    <div className="App">



      <div className = "search-bar-container">
        <SearchBar setResults={setResults} setFilteredCourses={setFilteredCourses} />
        <SearchResultsList results={results}/>
      </div>


      <BrowserRouter>
        <div className="Pages">
          <Routes>

            <Route 
              path="/"
              element={<HomePage filteredCourses={filteredCourses} />}
            />

          </Routes>
        </div>
      </BrowserRouter>



    </div>
  );
}

export default App;