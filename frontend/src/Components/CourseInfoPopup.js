import React from "react";
import "./CourseInfoPopup.css"

const CourseInfoPopup = (props) => {
    return (props.trigger) ? (
        <div className="CourseInfoPopup">
            <div className="CourseInfoPopupInner">
                <button 
                    className="close-popup-button"
                    onClick={() => props.setTrigger(false)}
                >
                    close
                </button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default CourseInfoPopup;