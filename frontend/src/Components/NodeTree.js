import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

// Some parts of NodeTree.js were adapted with the assistance of ChatGPT

const NodeTree = ({ node, courses }) => {
  const [treeData, setTreeData] = useState(null);

  const renderNode = (courseNode) => {
    const { code, prerequisites } = courseNode;
  
    // Render the root node with the course code
    const rootNode = {
      name: code,
      children: []
    };
  
    // If there are prerequisites, render children nodes accordingly
    if (prerequisites.length > 0) {
      // If prerequisites is an array of arrays
      if (Array.isArray(prerequisites[0])) {
        // If there's only one outer array, render 'any of' nodes directly
        if (prerequisites.length === 1) {
          const innerPrerequisites = prerequisites[0];
          // If inner prerequisites contain multiple options, render 'any of' node
          if (innerPrerequisites.length > 1) {
            rootNode.children.push({
              name: 'Any Of',
              children: innerPrerequisites.map((prerequisite) => {
                const prerequisiteCourse = courses.find((course) => course.code === prerequisite);
                if (prerequisiteCourse) {
                  return renderNode(prerequisiteCourse);
                }
                return {
                  code: prerequisite,
                  name: prerequisite,
                  credits: null,
                  instructors: [],
                  description: "",
                  prerequisites: []
                };
              })
            });
          } else if (innerPrerequisites.length === 1 && Array.isArray(innerPrerequisites[0]) && innerPrerequisites[0].length > 0) {
            // Render the single course option directly
            rootNode.children = innerPrerequisites[0].map((prerequisite) => {
              const prerequisiteCourse = courses.find((course) => course.code === prerequisite);
              if (prerequisiteCourse) {
                return renderNode(prerequisiteCourse);
              }
              return {
                code: prerequisite,
                name: prerequisite,
                credits: null,
                instructors: [],
                description: "",
                prerequisites: []
              };
            });
          }
        } else {
          // Render 'options' nodes for each outer array
          rootNode.children = prerequisites.map((option, index) => {
            // Skip rendering if the option array is empty
            if (option.length === 0) return null;

            return {
              name: `Option ${index + 1}`,
              children: option.map((prerequisite) => {
                // Render the single course option directly
                if (Array.isArray(prerequisite)) {
                  // Render an 'Any Of' node for inner prerequisites
                  if (prerequisite.length > 1) {
                    return {
                      name: 'Any Of',
                      children: prerequisite.map((innerPrerequisite) => {
                        const innerPrerequisiteCourse = courses.find((course) => course.code === innerPrerequisite);
                        if (innerPrerequisiteCourse) {
                          return renderNode(innerPrerequisiteCourse);
                        }
                        return {
                          code: innerPrerequisite,
                          name: innerPrerequisite,
                          credits: null,
                          instructors: [],
                          description: "",
                          prerequisites: []
                        };
                      })
                    };
                  } else {
                    // Render the single course option directly
                    const innerPrerequisiteCourse = courses.find((course) => course.code === prerequisite[0]);
                    if (innerPrerequisiteCourse) {
                      return renderNode(innerPrerequisiteCourse);
                    }
                    return {
                      code: prerequisite[0],
                      name: prerequisite[0],
                      credits: null,
                      instructors: [],
                      description: "",
                      prerequisites: []
                    };
                  }
                }
                // Render the single course option directly
                const prerequisiteCourse = courses.find((course) => course.code === prerequisite);
                if (prerequisiteCourse) {
                  return renderNode(prerequisiteCourse);
                }
                return {
                  code: prerequisite,
                  name: prerequisite,
                  credits: null,
                  instructors: [],
                  description: "",
                  prerequisites: []
                };
              })
            };
          }).filter(Boolean); // Remove any null entries from the array
        }
      } else {
        // If prerequisites is a simple array (no outer array)
        rootNode.children = prerequisites.map((prerequisite) => {
          const prerequisiteCourse = courses.find((course) => course.code === prerequisite);
          if (prerequisiteCourse) {
            return renderNode(prerequisiteCourse);
          }
          return {
            code: prerequisite,
            name: prerequisite,
            credits: null,
            instructors: [],
            description: "",
            prerequisites: []
          };
        });
      }
    }
  
    return rootNode;
  };

  useEffect(() => {
    const renderTreeData = () => {
      const data = renderNode(node);
      setTreeData(data);
    };

    if (courses.length > 0) {
      renderTreeData();
    }
  }, [courses, node]);

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