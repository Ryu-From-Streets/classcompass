import React from "react";
import "./CourseInfoPopup.css"
import { useNavigate } from "react-router-dom"; 

const CourseInfoPopup = (props) => {

    const course = props.course;

    const navigate = useNavigate(); 
    const handleTreeButtonClick = () => {
        navigate("/tree", { state: { course }  });
    };

    return (props.trigger) ? (
        <div className="CourseInfoPopup">
            <div className="CourseInfoPopupInner">
                <button 
                    className="close-popup-button"
                    onClick={() => props.setTrigger(false)}
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

                    <button onClick={handleTreeButtonClick}>See Prerequisite Tree</button>
                </div>
            </div>
        </div>
    ) : "";
}

export default CourseInfoPopup;