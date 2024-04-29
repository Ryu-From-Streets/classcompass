import { useEffect, useState } from "react";
import { fetchAllCoursesJSON } from "../Utils/get_data";


// COMPONENTS
import { SearchBar } from '../Components/SearchBar';
import CourseButton from "../Components/CourseButton";


const HomePage = () => {
    // state for search bar components
    const [courses, setCourses] = useState([]);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetchAllCoursesJSON(setCourses, setFeedback);
    }, []);

    
    return (
        <div className="HomePage">
            <div className="Courses">

                <div className = "search-bar-container">
                    <SearchBar setFilteredCourses={setCourses} setError={setFeedback} />
                </div>

                <p>{feedback}</p>

                {courses && courses.map((course) => (

                    <CourseButton course={course}/>

                ))}

            </div>
        </div>
    );

    
}

export default HomePage;