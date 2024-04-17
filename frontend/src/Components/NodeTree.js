import React from "react";
import { useNavigate } from "react-router-dom";

// Some parts of NodeTree.js and NodeTree.css were adapted with the assistance of ChatGPT

const NodeTree = ({ node, courses }) => {
    const navigate = useNavigate();

    const handleNodeClick = (course) => {
        navigate("/tree", { state: { course } });
    };

    const renderNode = (node) => {
        const { code, prerequisites } = node;

        const handleMouseEnter = (event) => {
            event.target.style.color = "red";
            event.target.style.textDecoration = "underline";
            event.target.style.cursor = "pointer";
        };

        const handleMouseLeave = (event) => {
            event.target.style.color = "";
            event.target.style.textDecoration = "";
            event.target.style.cursor = "";
        };

        return (
            <div className="node">
                <div
                    className="node__element"
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {code}
                </div>
                {prerequisites && prerequisites.length > 0 && (
                    <div className="node__children">
                        <div className="node__connection">
                            {prerequisites.map((prerequisite, index) => {
                                const prerequisiteCourse = courses.find(course => course.code === prerequisite[0]);
                                if (prerequisiteCourse) {
                                    return (
                                        <div className="node__child" key={index}>
                                            <div className="node__line"></div>
                                            <NodeTree node={prerequisiteCourse} courses={courses} />
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return renderNode(node);
};

export default NodeTree;