import React from "react";
import { useLocation } from "react-router-dom";

const TreePage = () => {
    const location = useLocation();
    const { state } = location || {};
    const course = state ? state.course : null;

    if (!course) {
        return <div>No course data available.</div>;
    }

    return (
        <div className="TreePage">
            <h2>Prerequisite Tree for {course.course_code}</h2>
        </div>
    );
};

export default TreePage;