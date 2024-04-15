import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NodeTree from "../Components/NodeTree";

const TreePage = () => {
    const location = useLocation();
    const { state } = location || {};
    const course = state ? state.course : null;
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("/Test_Data/Courses.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const findCourseByCourseName = (courseName) => {
        return courses.find((course) => course.course_name === courseName);
    };

    const generateTreeData = (course, depth) => {
        if (!course || depth <= 0) return null;

        const node = {
            course_code: course.course_code,
            prerequisites: [],
        };

        if (course.prerequisites && course.prerequisites.length > 0) {
            course.prerequisites.forEach((prerequisiteName) => {
                const prerequisiteCourse = findCourseByCourseName(prerequisiteName);
                if (prerequisiteCourse) {
                    const childNode = generateTreeData(prerequisiteCourse, depth - 1);
                    node.prerequisites.push(childNode);
                }
            });
        }

        return node;
    };

    const treeData = generateTreeData(course, 3);

    if (!course) {
        return <div>No course data available.</div>;
    }

    return (
        <div className="TreePage">
            <h2>Prerequisite Tree for {course.course_code}</h2>
            <NodeTree node={treeData} />
        </div>
    );
};

export default TreePage;