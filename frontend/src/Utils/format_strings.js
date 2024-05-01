
/**
 * Splits course code string into two tokens: course type and course number
 * 
 * EX: "COMPSCI220" -> ["COMPSCI", "220"]
 */
export function splitCourseCode ( courseCode ) {

    let courseTokens = [];
    let length = courseCode.length;
    let i;

    for (i = 0; i < courseCode.length; i++) {
        let ch = courseCode.charAt(i)
        if (ch >= "0" && ch <= "9") {
            break;
        }
    }

    courseTokens.push(courseCode.substring(0, i));
    courseTokens.push(courseCode.substring(i, length));

    return courseTokens;
}