//import React from "react";

export async function fetchAllCoursesJSON( setCourses, setFeedback ) {
    let response;

    // indicate to the user and console that courses are being fetched
    setFeedback("Fetching all courses...");
    console.log("Fetching all courses...");


    // try fetching all courses and log error to console if error
    try {
        response = await fetch("/courses", { method: "GET" });
    } catch (error) {
        console.log("Fetch error: " + error);
    }

    console.log("Response Status " + response.status + ": " + response.statusText);

    if (response.ok) {
        // if response is empty, indicate to the user that no courses were found
        if (response.length === 0) {
            setFeedback("No courses found");
            setCourses([]);
        }
        // if response is not empty, convert response to json and set courses
        else {
            setFeedback("");
            const jsonOfCourses = await response.json();
            setCourses(jsonOfCourses);
        }
    }
    // if some error fetching data, indicate to the user that there was an error
    else {
        setFeedback("Error fetching data");
        setCourses([]);
    }
}

export async function getFilteredCourses(  ) {

}