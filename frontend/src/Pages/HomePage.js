import { useEffect, useState } from "react";


// COMPONENTS
import { SearchBar } from '../Components/SearchBar';


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
            const response = await fetch("./Test_Data/Courses.json");
            const jsonOfCourses = await response.json();

            if (response.ok) {
                setFilteredCourses(jsonOfCourses);
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

                    // Temporary visualization of course data
                    // TODO: Create component for an individual course node specifically
                    //       I was thinking of using "react flow" for this but haven't had
                    //       the chance to learn it yet so doing this for now
                    <div className="TMP-Course-Data">
                        <h4>{course.Name}</h4>
                        <p>Instructors: {course.Instructors}</p>
                        <p>Description: {course.Description}</p>
                        <p>Prerequisites: {course.Prerequisites}</p>
                    </div>

                ))}

            </div>
        </div>
    );

    
}

export default HomePage;