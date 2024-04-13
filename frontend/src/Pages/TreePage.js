import React from "react";
import { useLocation } from "react-router-dom";
import NodeTree from "../Components/NodeTree";

const TreePage = () => {
    const location = useLocation();
    const { state } = location || {};
    const course = state ? state.course : null;
  
    const generateTreeData = (course, depth) => {
        if (!course || depth <= 0) return null;
      
        const node = {
          course_code: course.course_code,
          prerequisites: [],
        };
      
        if (course.prerequisites && course.prerequisites.length > 0) {
          course.prerequisites.forEach((prerequisite) => {
            const childNode = {
              course_code: prerequisite,
              prerequisites: [],
            };
            node.prerequisites.push(childNode);
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