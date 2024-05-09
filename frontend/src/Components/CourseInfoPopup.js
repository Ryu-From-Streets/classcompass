import React, { useEffect } from "react";
import "./CourseInfoPopup.css"
import { useNavigate } from "react-router-dom"; 
import { addCourseToStudent, removeCourseFromStudent } from "../Utils/send_data";

const CourseInfoPopup = ( { popupVisibility, setPopupVisibility, course, user, taken } ) => {
    const navigate = useNavigate(); 
    let student = false;
    let admin = false;

    if (user && user.role === "student") {
        student = true;
    }
    else if (user && user.role === "advisor") {
        admin = true;
    }

    // Takes user to tree page for corresponding course on click
    // Always accessible
    const handleTreeButtonClick = () => {
        navigate("/tree", { state: { course }  });
    };

    // Takes user to login page on click
    // Accessible if user not logged in (has no user role)
    const handleSignInPromptButtonClick = () => {
        navigate("/login");
    };

    // Marks corresponding course as taken on click
    // Only accessible if logged in as student and they have not taken the course
    const handleTakeButtonClick = () => {
        addCourseToStudent(user, course.code);
        setPopupVisibility(false);
    };

    // Marks corresponding course as not taken on click
    // Only accesible if logged in as student and they have taken the course
    const handleUntakeButtonClick = () => {
        removeCourseFromStudent(user, course.code);
        setPopupVisibility(false);
    };

    // Takes user to course edit page
    // Only accessible if logged in as admin
    const handleEditButtonClick = () => {
        navigate("/editCourse", { state: { user, course } });
    };

    useEffect(() => {

    }, [taken]);

    return (popupVisibility) ? (
        <div className="CourseInfoPopup">
            <div className="CourseInfoPopupInner">
                <button 
                    className="close-popup-button"
                    onClick={() => setPopupVisibility(false)}
                >
                    close
                </button>

                <div className="course-content">
                    <h1>{course.code}</h1>
                    <h2>{course.name}</h2>
                    <p><strong>Credits:</strong> {course.credits}</p>
                    <p><strong>Instructor(s):</strong> {course.instructors.join(", ")}</p>
                    <p><strong>Description:</strong> {course.description}</p>
                    <p><strong>Prerequisites:</strong> {course.prerequisites.flat().join(" ")}</p>
                    
                </div>

                <button className="tree-button" onClick={handleTreeButtonClick}>See Prerequisite Tree</button>

                {!student && !admin && <button className="sign-in-prompt-button" onClick={handleSignInPromptButtonClick}>Sign in to mark courses as taken!</button>}

                {student && !taken && <button className="take-course-button" onClick={handleTakeButtonClick}>Set Course as Taken</button>}
                {student && taken && <button className="untake-course-button" onClick={handleUntakeButtonClick}>Set Course as Not Taken</button>}
                {admin && <button className="edit-course-button" onClick={handleEditButtonClick}>Edit Course</button>}
            </div>
        </div>
    ) : "";
}

export default CourseInfoPopup;