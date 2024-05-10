import { useEffect, useState } from "react";
import { getAllCoursesJSON, getUser, getCookie } from "../Utils/get_data";


// COMPONENTS
import { SearchBar } from '../Components/SearchBar';
import CourseButton from "../Components/CourseButton";


const HomePage = () => {
    // FEEDBACK STATES
    const [courseFeedback, setCourseFeedback] = useState("");

    // COURSES AND STUDENT STATES
    const [allCourses, setAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [user, setUser] = useState([]);

    // fetch all courses and store them in courses state every time the page is loaded
    // also store a copy of all courses in filteredCourses state for use in search bar component
    useEffect(() => {

        let user_type = getCookie("userType");
        let user_id = getCookie("userID");
        let auth_token = getCookie("authToken");

        async function setStates() {
            // fetches all courses and creates a copy for search bar
            const coursesJSON = await getAllCoursesJSON(setCourseFeedback);
            setAllCourses(coursesJSON);
            setFilteredCourses(coursesJSON);

            // fetches user 
            const userJSON = await getUser(user_type, user_id, auth_token);
            setUser(userJSON);
        }
        setStates();

        

    }, []);

    
    return (
        <div className="HomePage">
            <div className="Courses">

                <h1>Search For a Course!</h1>

                <div className = "search-bar-container">
                    <SearchBar 
                        allCourses={allCourses} 
                        setFilteredCourses={setFilteredCourses} 
                        setFeedback={setCourseFeedback} 
                    />
                </div>

                <p>{courseFeedback}</p>

                {filteredCourses && filteredCourses.map((filteredCourse) => (

                    <CourseButton 
                        key={filteredCourse.code} 
                        course={filteredCourse} 
                        user={user}
                    />

                ))}

            </div>
        </div>
    );

    
}

export default HomePage;