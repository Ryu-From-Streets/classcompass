import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NodeTree from '../Components/NodeTree';
import { fetchAllCoursesJSON } from '../Utils/get_data';

// Some parts of TreePage.js were adapted with the assistance of ChatGPT

const TreePage = () => {
  const location = useLocation();
  const { state } = location || {};
  const course = state ? state.course : null;
  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchAllCoursesJSON(setCourses, setFeedback);
  }, []);

  if (!course) {
    return <div>No course data available.</div>;
  }

  return (
    <div className="TreePage">
      <p>{feedback}</p>
      <h2>Prerequisite Tree for {course.code}</h2>
      <NodeTree node={course} courses={courses} />
    </div>
  );
};

export default TreePage;