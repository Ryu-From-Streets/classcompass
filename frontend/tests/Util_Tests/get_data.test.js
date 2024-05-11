import { getAllCoursesJSON } from "../../src/Utils/get_data.js";
import fetchMock from 'jest-fetch-mock';

// Set up fetch mock
fetchMock.enableMocks();

// Define a mock setFeedback function
const setFeedback = jest.fn();

describe("getAllCoursesJSON", () => {
    it("fetches all courses from the backend and returns them as JSON", async () => {
        // Mock the fetch response
        fetchMock.mockResponse(JSON.stringify([
            { code: "CICS110", name: "Foundations of Programming" },
            { code: "CS320", name: "Introduction to Software Engineering" }
        ]));

        // Call getAllCoursesJSON and pass the mock setFeedback function
        const courses = await getAllCoursesJSON(setFeedback);

        // Check that all courses are fetched
        expect(courses.length).toEqual(2); 
        // Check that the first and last courses are the same as expected from the backend
        expect(courses[0].code).toEqual("CICS110");
        expect(courses[0].name).toEqual("Foundations of Programming");
        expect(courses[courses.length - 1].code).toEqual("CS320");
        expect(courses[courses.length - 1].name).toEqual("Introduction to Software Engineering");
    });
});