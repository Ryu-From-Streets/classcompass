import { useEffect, useState } from "react";


const AdvisorsPage = () => {

    const [advisors, setAdvisors] = useState([]);

    useEffect(() => {
        const fetchAllAdvisors = async () => {
            const response = await fetch("/getAdvisorsList");
            const jsonOfCourses = await response.json();

            if (response.ok) {
                setAdvisors(jsonOfCourses);
            }
            if (!response.ok) {
                console.log("ERROR FETCHING DATA");
            }
        };

        fetchAllAdvisors();
    }, []);


    return (
        <div className="AdvisorsPage">
            <div className="Advisors">
                {advisors && advisors.map((advisor) => (
                    <div className="advisor">
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