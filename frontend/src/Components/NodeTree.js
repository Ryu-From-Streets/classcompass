import React from "react";

const NodeTree = ({ node }) => {
  const renderNode = (node) => {
    const { course_code, prerequisites } = node;

    return (
      <div className="node">
        <div className="node__element">{course_code}</div>
        {prerequisites && prerequisites.length > 0 && (
          <div className="node__children">
            <div className="node__connection">
              {prerequisites.map((prerequisite, index) => (
                <div className="node__child" key={index}>
                  <div className="node__line"></div>
                  <NodeTree node={prerequisite} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return renderNode(node);
};

export default NodeTree;