import { useEffect, useState } from "react";


// COMPONENTS
import { SearchBar } from '../Components/SearchBar';
import CourseButton from "../Components/CourseButton"


const HomePage = () => {
    // state for search bar components
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllCourses = async () => {
            setError("");
            const response = await fetch("/Test_Data/Courses.json");
            const jsonOfCourses = await response.json();

            if (response.ok) {
                setFilteredCourses(jsonOfCourses);
            }
            if (!response.ok) {
                console.log("ERROR FETCHING DATA");
                setError("Error fetching courses");
            }
        };

        fetchAllCourses();
    }, []);

    
    return (
        <div className="HomePage">
            <div className="Courses">

                <div className = "search-bar-container">
                    <SearchBar setFilteredCourses={setFilteredCourses} setError={setError} />
                </div>

                <p>{error}</p>

                {filteredCourses && filteredCourses.map((course) => (

                    <CourseButton course={course}/>

                ))}

            </div>
        </div>
    );

    
}

export default HomePage;