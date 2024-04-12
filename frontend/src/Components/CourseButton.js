import { useState } from "react";

import "./CourseButton.css";

import { useNavigate } from "react-router-dom"; 

/* Course Button and CourseInfoPopup adapted from https://www.youtube.com/watch?v=i8fAO_zyFAM */

// COMPONENTS
import CourseInfoPopup from "./CourseInfoPopup";

const CourseButton = ({ course }) => {
    const [popupVisibility, setPopupVisibility] = useState(false);
    const navigate = useNavigate(); 

    const handleTreeButtonClick = () => {navigate("/tree");};

    return (
        <>
            <button 
                className="CourseButton"
                onClick={() => setPopupVisibility(true)}
            >
                { course.course_code }
            </button>

            <CourseInfoPopup trigger={popupVisibility} setTrigger={setPopupVisibility}>
                <h1>{course.course_code}</h1>
                <p><strong>Instructor(s):</strong> {course.instructors}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Prerequisites:</strong> {course.prerequisites}</p>

                <button onClick={handleTreeButtonClick}>See Prerequisite Tree</button>
            </CourseInfoPopup>
        </>
    );
}

export default CourseButton;