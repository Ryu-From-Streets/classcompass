import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults, setFilteredCourses }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("./Test_Data/Courses.json")
            .then((response) => response.json())
            .then(json => {
                let results;
                if (value.trim() === "") {
                    results = json;
                } else {
                    results = json.filter((course) => {
                        return (
                            course && 
                            course.Name && 
                            course.Name.toLowerCase().includes(value.toLowerCase())
                        );
                    });
                }
                setResults(results);
                setFilteredCourses(results);
            });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                placeholder="Type to search..." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}
            />    
        </div>
    );
}