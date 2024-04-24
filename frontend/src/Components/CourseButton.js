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
                <p className="class-code">{ course.code }</p>
                <p className="class-name">{ course.name }</p>
            </button>

            <CourseInfoPopup trigger={popupVisibility} setTrigger={setPopupVisibility} course={course}>
            </CourseInfoPopup>
        </>
    );
}

export default CourseButton;