const { MongoClient, ObjectId } = require("mongodb");

// Set timeout for tests to 30s
jest.setTimeout(30000);

// API Endpoint Link that will be used to connect to Mongo DB Atlas Cluster
const uri =
  "mongodb+srv://ClassCompass:ClassCompass123@cluster0.v2vplda.mongodb.net/test?retryWrites=true&w=majority";

// Create a mongo DB instance
let client;

// Establish a connection to MongoDB Atlas cluster before running tests
beforeAll(async () => {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// Close MongoDB connection after running tests
afterAll(async () => {
  try {
    await client.close();
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
});

describe("Database Tests", () => {
  let db;
  let studentsCollection;

  beforeEach(async () => {
    // Get and store a reference to the database and collection
    db = client.db();
    studentsCollection = db.collection("students");
  });

  test('CREATE student without required field should fail', async () => {
    // Create a student object with missing required fields
    const studentMissingRequiredFields = { first_name: 'Paul' };
    let error;
    try {
      // use a promise to attempt to insert student into the database
      await studentsCollection.insertOne(studentMissingRequiredFields);
    } catch (receivedError) {
      // Catch the error received
      error = receivedError;
    }
    // Expect a MongoDB duplicate key error
    expect(error).toBeDefined();
    expect(error.message).toContain("E11000 duplicate key error");
  });

  test("Test READ Operation", async () => {
    // Generate a unique ID for the test
    const id = new ObjectId();

    // Insert a sample student into the mongoDB collection
    const testStudent = {
      _id: id,
      first_name: "Lily",
      last_name: "Cat",
      email: `testuser_${id}@umass.edu`,
      major: ["Computer Science"],
      credits: 3,
      courses_taken: ["CS 320", "CS 311", "CS 210", "CS 345"],
      advisor: "",
      last_viewed_courses: [""],
      password: "abc143",
      question: "",
      answer: "",
      role: "student"
    };
    await studentsCollection.insertOne(testStudent);

    // use ID to find the student inserted
    const findStudent = await studentsCollection.findOne({ _id: id });

    // Check if the retrieved student matches the inserted student
    expect(findStudent).toEqual(testStudent);
  });

  test("Test UPDATE Operation", async () => {
    // Generate a unique ID so multiple tests can be ran with unique IDs
    const id = new ObjectId();

    // Insert a sample student into the collection
    const testStudent = {
      _id: id,
      first_name: "Mark",
      last_name: "Cat",
      email: `testuser_${id}@umass.edu`,
      major: ["Computer Science"],
      credits: 3,
      courses_taken: ["CS 320", "CS 311", "CS 210", "CS 345"],
      advisor: "",
      last_viewed_courses: [""],
      password: "abc143",
      question: "",
      answer: "",
      role: "student"
    };
    await studentsCollection.insertOne(testStudent);

    // Update the student's information
    const updatedStudent = {
      $set: {
        credits: 20,
        courses_taken: [...testStudent.courses_taken, "MATH 235"],
        password: "newpassword123"
      }
    };
    const updateResult = await studentsCollection.updateOne({ _id: id }, updatedStudent);

    // Check if the student is updated successfully
    expect(updateResult.modifiedCount).toBe(1);
  });

  test("Test DELETE Operation", async () => {
    // Generate a unique ID for the test
    const id = new ObjectId();

    // Insert a sample student into the collection
    const testStudent = {
      _id: id,
      first_name: "Ann",
      last_name: "Cat",
      email: `testuser_${id}@umass.edu`,
      major: ["Computer Science"],
      credits: 3,
      courses_taken: ["CS 320", "CS 311", "CS 210", "CS 345"],
      advisor: "",
      last_viewed_courses: [""],
      password: "abc143",
      question: "",
      answer: "",
      role: "student"
    };
    await studentsCollection.insertOne(testStudent);

    // Delete the student from the collection through their ID
    const deleteResult = await studentsCollection.deleteOne({ _id: id });

    // Check if the student is deleted successfully
    expect(deleteResult.deletedCount).toBe(1);
  });

});
