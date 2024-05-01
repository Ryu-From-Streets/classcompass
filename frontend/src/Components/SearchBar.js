import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { getFilteredCourses } from "../Utils/get_data";

// searchBar, SearchResult, and SearchResults lists adapted from https://www.youtube.com/watch?v=sWVgMcz8Q44&t=146s

export const SearchBar = ({ allCourses, setFilteredCourses, setFeedback }) => {
    const [input, setInput] = useState("");


    const fetchData = (value) => {
        const filteredCourses = getFilteredCourses(value, allCourses, setFeedback);
        setFilteredCourses(filteredCourses);
    }


    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                id="course-search"
                name="course-search"
                placeholder="Type to search..." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}
            />    
        </div>
    );
}