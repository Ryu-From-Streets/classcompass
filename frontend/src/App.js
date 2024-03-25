import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// PAGES
import HomePage from "./Pages/HomePage";

// COMPONENTS
import { SearchBar } from './Components/SearchBar';
import { SearchResultsList } from './Components/SearchResultList';


function App() {
  // state for search bar components
  const [results, setResults] = useState([]);

  return (
    <div className="App">



      <div className = "search-bar-container">
        <SearchBar setResults={setResults}/>
        <SearchResultsList results={results}/>
      </div>


      <BrowserRouter>
        <div className="Pages">
          <Routes>

            <Route 
              path="/"
              element={<HomePage />}
            />

          </Routes>
        </div>
      </BrowserRouter>



    </div>
  );
}

export default App;