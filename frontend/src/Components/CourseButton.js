import { useState } from "react";
import { splitCourseCode } from "../Utils/format_strings";
import "./CourseButton.css";


/* Course Button and CourseInfoPopup adapted from https://www.youtube.com/watch?v=i8fAO_zyFAM */

// COMPONENTS
import CourseInfoPopup from "./CourseInfoPopup";

const CourseButton = ({ course, user }) => {
    const [popupVisibility, setPopupVisibility] = useState(false);

    // gets course code as array where first item is the course type (ex: "COMPSCI")
    // and the second item is the couse number (ex: "220")
    let courseTokens = splitCourseCode(course.code);

    let isTaken = "notTaken";
    let taken = false;
    if (user.courses_taken && user.courses_taken.includes(course.code)) {
        isTaken = "taken";
        taken = true;
    }

    return (
        <>
            <button
                className="CourseButton"
                id={isTaken}
                onClick={() => setPopupVisibility(true)}
            >
                <p className="class-code">{ courseTokens[0] + " " + courseTokens[1] }</p>
                <p className="class-name">{ course.name }</p>
            </button>

            <CourseInfoPopup 
                popupVisibility={popupVisibility} 
                setPopupVisibility={setPopupVisibility} 
                course={course}
                user={user}
                taken={taken}
            />
        </>
    );
}

export default CourseButton;