import { useState } from "react";

import "./CourseButton.css";

import { useNavigate } from "react-router-dom"; 

/* Course Button and CourseInfoPopup adapted from https://www.youtube.com/watch?v=i8fAO_zyFAM */

// COMPONENTS
import CourseInfoPopup from "./CourseInfoPopup";

const CourseButton = ({ course }) => {
    const [popupVisibility, setPopupVisibility] = useState(false);
    const navigate = useNavigate(); 

    const handleTreeButtonClick = () => {
        navigate("/tree", { state: { course } });
    };

    return (
        <>
            <button 
                className="CourseButton"
                onClick={() => setPopupVisibility(true)}
            >
                <p className="class-code">{ course.code }</p>
                <p className="class-name">{ course.name }</p>
            </button>

            <CourseInfoPopup trigger={popupVisibility} setTrigger={setPopupVisibility}>
                <h1>{course.code}</h1>
                <h2>{course.name}</h2>
                <p><strong>Credits:</strong> {course.credits}</p>
                <p><strong>Instructor(s):</strong> {course.instructors}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Prerequisites:</strong> {course.prerequisites.flat().join(" ")}</p>

                <button onClick={handleTreeButtonClick}>See Prerequisite Tree</button>
            </CourseInfoPopup>
        </>
    );
}

export default CourseButton;