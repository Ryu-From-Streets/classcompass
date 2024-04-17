import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

// Some parts of NodeTree.js were adapted with the assistance of ChatGPT

const NodeTree = ({ node, courses }) => {
  const [treeData, setTreeData] = useState(null);

  const renderNode = (courseNode) => {
    const { code, prerequisites } = courseNode;
    return {
      name: code,
      children: prerequisites.map((prerequisite) => {
        const childNodes = Array.isArray(prerequisite)
          ? prerequisite.map((prereq) => {
              const prerequisiteCourse = courses.find((course) => course.code === prereq);
              if (prerequisiteCourse) {
                return renderNode(prerequisiteCourse);
              }
              return null;
            })
          : [prerequisite].map((prereq) => {
              const prerequisiteCourse = courses.find((course) => course.code === prereq);
              if (prerequisiteCourse) {
                return renderNode(prerequisiteCourse);
              }
              return null;
            });
        return childNodes.length > 1 ? { name: 'Any Of', children: childNodes } : childNodes[0];
      }),
    };
  };

  useEffect(() => {
    const renderTreeData = () => {
      const data = renderNode(node);
      setTreeData(data);
    };

    if (courses.length > 0) {
      renderTreeData();
    }
  }, [node, courses]);


  return treeData ? (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: window.innerWidth / 2, y: window.innerHeight / 10 }}
        collapsible={false}
        zoomable={true}
        separation={{ siblings: 2, nonSiblings: 2 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
      />
    </div>
  ) : null;
};

export default NodeTree;