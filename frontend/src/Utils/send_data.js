import { getCookie } from "./get_data";
import axios from "axios";



export async function addCourseToStudent(user, course_code) {
    let auth_token = getCookie("authToken");

    let new_courses_taken = user.courses_taken;
    new_courses_taken.push(course_code);

    // MUST SEND PUT REQUEST USING AXIOS IN THIS FORMAT
    // USING FETCH OR PULLING DATA OUT INTO VARIABLES
    // BREAKS PUT FOR SOME REASON
    // I SWEAR TO GOD IF THIS IS MODIFIED IN ANY WAY
    // PUT WILL NOT UPDATE COURSES FOR NO GOOD REASON
    // WHY DOES IT NOT WORK OTHERWISE
    // 3 HOURS WASTED D:
    axios.put(`/students/${user._id}`, {courses_taken: new_courses_taken}, {headers: {Authorization: `Bearer ${auth_token}`}})
    .then(response => console.log(response))
    .catch();
}


const removeElementFromArray = (arr, elem) => {
    let newArr = arr;

    let i = 0;
    while (i < newArr.length) {
        if (newArr[i] === elem) {
          newArr.splice(i, 1);
        } else {
          ++i;
        }
    }
  return newArr;
}

export async function removeCourseFromStudent(user, course_code) {
    let auth_token = getCookie("authToken");

    console.log("old " + user.courses_taken);

    let new_courses_taken = removeElementFromArray(user.courses_taken, course_code);

    console.log("new " + new_courses_taken);

    // MUST SEND PUT REQUEST USING AXIOS IN THIS FORMAT
    // USING FETCH OR PULLING DATA OUT INTO VARIABLES
    // BREAKS PUT FOR SOME REASON
    // I SWEAR TO GOD IF THIS IS MODIFIED IN ANY WAY
    // PUT WILL NOT UPDATE COURSES FOR NO GOOD REASON
    // WHY DOES IT NOT WORK OTHERWISE
    // 3 HOURS WASTED D:
    axios.put(`/students/${user._id}`, {courses_taken: new_courses_taken}, {headers: {Authorization: `Bearer ${auth_token}`}})
    .then(response => console.log(response))
    .catch();
}