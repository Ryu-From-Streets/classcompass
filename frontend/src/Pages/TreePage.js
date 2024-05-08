import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NodeTree from '../Components/NodeTree';
import { getAllCoursesJSON } from '../Utils/get_data';

// Some parts of TreePage.js were adapted with the assistance of ChatGPT

const TreePage = () => {
  const location = useLocation();
  const { state } = location || {};
  const course = state ? state.course : null;
  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function setStates() {
      const coursesJSON = await getAllCoursesJSON(setFeedback);
      setCourses(coursesJSON);
    }

    setStates();
  }, []);

  if (!course) {
    return <div>No course data available.</div>;
  }

  return (
    <div className="TreePage">
      <Link className="back-link" to="/">&lt; Back to Search</Link>
      <h2>Prerequisite Tree for {course.code}</h2>
      <p>{feedback}</p>
      <NodeTree node={course} courses={courses} />
    </div>
  );
};

export default TreePage;