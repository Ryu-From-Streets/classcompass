import { useEffect, useState } from "react";
import { getAllCoursesJSON } from "../Utils/get_data";


// COMPONENTS
import { SearchBar } from '../Components/SearchBar';
import CourseButton from "../Components/CourseButton";


const HomePage = () => {
    // states for
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [feedback, setFeedback] = useState("");

    // fetch all courses and store them in courses state every time the page is loaded
    // also store a copy of all courses in filteredCourses state for use in search bar component
    useEffect(() => {
        async function setStates() {
            const coursesJSON = await getAllCoursesJSON(setFeedback);
            setAllCourses(coursesJSON);
            setFilteredCourses(coursesJSON);
        }
        setStates();
    }, []);

    
    return (
        <div className="HomePage">
            <div className="Courses">

                <h1>Search For a Course!</h1>

                <div className = "search-bar-container">
                    <SearchBar allCourses={allCourses} setFilteredCourses={setFilteredCourses} setFeedback={setFeedback} />
                </div>

                <p>{feedback}</p>

                {filteredCourses && filteredCourses.map((filteredCourse) => (

                    <CourseButton key={filteredCourse.code} course={filteredCourse}/>

                ))}

            </div>
        </div>
    );

    
}

export default HomePage;