import logo from './logo.svg';
import { useState } from "react";
import './App.css';
import { SearchBar } from './Components/SearchBar';
import { SearchResultsList } from './Components/SearchResultList';

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className = "search-bar-container">
        <SearchBar setResults={setResults}/>
        <SearchResultsList results={results}/>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
