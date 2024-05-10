import React from "react";
import { useEffect, useState } from "react";


const AdvisorsPage = () => {

    const [advisors, setAdvisors] = useState([]);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        setFeedback("");
        const fetchAllAdvisors = async () => {
            const response = await fetch("/getAdvisorsList");
            const jsonOfCourses = await response.json();

            if (response.ok) {
                if (response.length === 0) {
                    setFeedback("No advisors found");
                }
                else {
                    setAdvisors(jsonOfCourses);
                    setFeedback("");
                }
            }
            if (!response.ok) {
                console.log("ERROR FETCHING DATA");
                setFeedback("Error fetching advisors");
            }
        };

        fetchAllAdvisors();
    }, []);


    return (
        <div className="AdvisorsPage">
            <div className="Advisors">
                <p className="feedback">{feedback}</p>
                {advisors && advisors.map((advisor) => (
                    <div key={advisor.name} className="advisor">
                        <p><strong>{advisor.name}</strong></p>
                        <p>{advisor.title}</p>
                        <a href={"mailto:" + advisor.email}>{advisor.email}</a>
                        <b></b>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdvisorsPage;