import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NodeTree from '../Components/NodeTree';
import { getAllCoursesJSON, getUser, getCookie } from '../Utils/get_data';

// Some parts of TreePage.js were adapted with the assistance of ChatGPT

const TreePage = () => {
  const location = useLocation();
  const { state } = location || {};
  const course = state ? state.course : null;
  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState([]); // don't remove user, causes errors
  const [takenCourses, setTakenCourses] = useState([]);

  useEffect(() => {
    
    let user_type = getCookie("userType");
    let user_id = getCookie("userID");
    let auth_token = getCookie("authToken");

    async function fetchData() {
      const coursesJSON = await getAllCoursesJSON(setFeedback);
      setCourses(coursesJSON);

      const userJSON = await getUser(user_type, user_id, auth_token);
      setUser(userJSON);
      setTakenCourses(userJSON.courses_taken || []);
    }

    fetchData();
  }, []);

  if (!course) {
    return <div>No course data available.</div>;
  }

  return (
    <div className="TreePage">
      <Link className="back-link" to="/">&lt; Back to Search</Link>
      <h2>Prerequisite Tree for {course.code}</h2>
      <p>{feedback}</p>
      <NodeTree node={course} courses={courses} takenCourses={takenCourses} />
    </div>
  );
};

export default TreePage;