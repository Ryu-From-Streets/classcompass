//import React from "react";


/**
 * Fetches all courses from backend API and updates course and feedback states
 * passed in as parameters
 * 
 */
export async function getAllCoursesJSON( setFeedback ) {
    let response;

    // indicate to the user and console that courses are being fetched
    setFeedback("Fetching courses...");
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
        }
        // if response is not empty, convert response to json and set courses
        else {
            setFeedback("");
            const jsonOfCourses = await response.json();
            return jsonOfCourses;
        }
    }
    // if some error fetching data, indicate to the user that there was an error
    else {
        setFeedback("Error fetching data");
    }

    return [];
}


/**
 * Fetches all courses from backend API and updates course and feedback states
 * passed in as parameters, filtered by a search input
 * 
 */
export function getFilteredCourses( searchParameter, allCourses, setFeedback ) {
    console.log("Searching for course with code or name that matches: \"" + searchParameter + "\"");

    // if search is empty, return all courses
    if (searchParameter.trim() === "") {
        setFeedback("");
        return allCourses;
    } 

    // if search isn't empty, filter courses by
    // matching search parameter to course code or name
    let filteredCourses;

    filteredCourses = allCourses.filter((course) => {
        return (
            (course && 
            course.code && 
            course.code.toLowerCase().includes(searchParameter.trim().toLowerCase())) ||
            (course &&
            course.name &&
            course.name.toLowerCase().includes(searchParameter.trim().toLowerCase()))
        );
    });

    // if search parameter matched no courses, 
    // set feedback that no course was found
    let length = filteredCourses.length;
    if (length === 0) {
        setFeedback("No courses found");
        console.log("No courses found");
        filteredCourses = [];
    }
    else {
        setFeedback(length + " course(s) found");
        console.log(length + " course(s) found");
    }

    return filteredCourses;
}


// function from https://stackoverflow.com/questions/51109559/get-cookie-with-react
export function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}


export async function getUser(user_type, user_id, auth_token) {
    let response;

    if (user_type === "student") {
        response = await fetch(`/students/${user_id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${auth_token}`
            }
        });
    }
    else if (user_type === "advisor") {
        response = await fetch(`/advisors/${user_id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${auth_token}`
            }
        });
    }
    let userJSON = [];

    if (response && response.ok) {
        userJSON = await response.json();
    }

    return userJSON;
}