// tests/models/advisor.test.js
const mongoose = require("mongoose");
const advisorFunctions = require('../../models/advisor'); // Adjust path as necessary

describe("Advisor Model Tests", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test("Create advisor - tests creating an advisor and verifies the creation", async () => {
        const newAdvisor = {
            first_name: "Ann",
            last_name: "Jane",
            email: "ajane@umass.edu",
            password: "advisor123",
            current_students: ["Paul", "Abby", "Maria"],
            role: "advisor"
        };
        const advisor = await advisorFunctions.createAdvisor(newAdvisor);
        expect(advisor.email).toEqual(newAdvisor.email); // Verify critical field
    });

    test("Update advisor - checks if the advisor details are updated correctly", async () => {
        const originalAdvisor = await advisorFunctions.createAdvisor({
            first_name: "Ann",
            last_name: "Jane",
            email: "update@umass.edu",
            password: "password123",
            current_students: [],
            role: "advisor"
        });
        const updatedDetails = { last_name: "Doe", id: originalAdvisor._id };
        const updatedAdvisor = await advisorFunctions.updateAdvisor(updatedDetails);
        expect(updatedAdvisor.last_name).toEqual("Doe");
    });

    test("Get advisor by ID - verifies the advisor can be fetched by ID", async () => {
        const advisorId = "expectedMockedId"; // This would be a real ID in a live test
        const advisor = await advisorFunctions.getAdvisorById(advisorId);
        expect(advisor._id).toEqual(advisorId);
    });

    test("Delete advisor - tests if an advisor can be deleted", async () => {
        const advisorId = "expectedMockedIdToDelete"; // Assume this is a valid ID
        const deletionResult = await advisorFunctions.deleteAdvisor(advisorId);
        expect(deletionResult).toBeNull(); // Assuming delete returns null on success
    });
});
