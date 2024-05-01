import { useState } from "react";
import { splitCourseCode } from "../Utils/format_strings";
import "./CourseButton.css";


/* Course Button and CourseInfoPopup adapted from https://www.youtube.com/watch?v=i8fAO_zyFAM */

// COMPONENTS
import CourseInfoPopup from "./CourseInfoPopup";

const CourseButton = ({ course }) => {
    const [popupVisibility, setPopupVisibility] = useState(false);

    // gets course code as array where first item is the course type (ex: "COMPSCI")
    // and the second item is the couse number (ex: "220")
    let courseTokens = splitCourseCode(course.code);

    return (
        <>
            <button 
                className="CourseButton"
                onClick={() => setPopupVisibility(true)}
            >
                <p className="class-code">{ courseTokens[0] + " " + courseTokens[1] }</p>
                <p className="class-name">{ course.name }</p>
            </button>

            <CourseInfoPopup trigger={popupVisibility} setTrigger={setPopupVisibility} course={course}>
            </CourseInfoPopup>
        </>
    );
}

export default CourseButton;