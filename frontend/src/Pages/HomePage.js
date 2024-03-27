import { useEffect, useState } from "react";


// COMPONENTS
import { SearchBar } from '../Components/SearchBar';
import CourseButton from "../Components/CourseButton"
import { json } from "react-router-dom";


const HomePage = () => {
    // state for search bar components
    const [results, setResults] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const fetchAllCourses = async () => {
            // Currently fetching data from local files for test purposes
            // TODO: integrate with backend(Need backend to set up their api first)
            //       will probably be along the lines of fetch("http://localhost:PORT")
            //       where PORT is whatever port we end up using for backend
            const response = await fetch("/api/courses");
            const jsonOfCourses = await response.json();

            if (response.ok) {
                setFilteredCourses(jsonOfCourses);
            }
            if (!response.ok) {
                console.log("ERROR FETCHING DATA");
            }
        };

        fetchAllCourses();
    }, []);

    
    return (
        <div className="HomePage">
            <div className="Courses">

                <div className = "search-bar-container">
                    <SearchBar setResults={setResults} setFilteredCourses={setFilteredCourses} />
                </div>

                {filteredCourses && filteredCourses.map((course) => (

                    <CourseButton course={course}/>

                ))}

            </div>
        </div>
    );

    
}

export default HomePage;