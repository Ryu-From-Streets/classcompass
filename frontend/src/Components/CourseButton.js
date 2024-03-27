import { useState } from "react";
import "./CourseButton.css";

/* Course Button and CourseInfoPopup adapted from https://www.youtube.com/watch?v=i8fAO_zyFAM */

// COMPONENTS
import CourseInfoPopup from "./CourseInfoPopup";

const CourseButton = ({ course }) => {
    const [popupVisibility, setPopupVisibility] = useState(false);

    return (
        <>
            <button 
                className="CourseButton"
                onClick={() => setPopupVisibility(true)}
            >
                { course.Name }
            </button>

            <CourseInfoPopup trigger={popupVisibility} setTrigger={setPopupVisibility}>
                <h1>{course.Name}</h1>
                <p><strong>Instructor(s):</strong> {course.Instructors}</p>
                <p><strong>Description:</strong> {course.Description}</p>
                <p><strong>Prerequisites:</strong> {course.Prerequisites}</p>

                {/* TODO: link this button to go to a page of that course and prerequisites as a tree */}
                <button>See Prerequisite Tree</button>
            </CourseInfoPopup>
        </>
    );
}

export default CourseButton;