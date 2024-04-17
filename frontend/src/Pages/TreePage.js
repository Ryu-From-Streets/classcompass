import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NodeTree from '../Components/NodeTree';

// Some parts of TreePage.js were adapted with the assistance of ChatGPT

const TreePage = () => {
  const location = useLocation();
  const { state } = location || {};
  const course = state ? state.course : null;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/Test_Data/Courses.json');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  if (!course) {
    return <div>No course data available.</div>;
  }

  return (
    <div className="TreePage">
      <h2>Prerequisite Tree for {course.code}</h2>
      <NodeTree node={course} courses={courses} />
    </div>
  );
};

export default TreePage;