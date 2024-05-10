const { MongoClient } = require("mongodb");
//import student model from models folder
const studentModel = require('../../models/student');
//import Mongoose library for MongoDb Object Modeling
const mongoose = require('mongoose');


//Set timeout for test t0 30s
jest.setTimeout(30000);

//Stores MongoDB connection URI
const uri =
  "mongodb+srv://ClassCompass:ClassCompass123@cluster0.v2vplda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

describe("Database Tests", () => {
 
  //Establishes connection before running tests
  beforeAll(async () => {
    try {
      await client.connect();
      //connect to database cluster0 
      const db = client.db("cluster0");
      // store the students collection to test
      studentsCollection = db.collection("students");
    } catch (error) {
      console.error("Unable to connect to the database, received error:", error);
    }
  });

     // Test to check that no student is created with missing required fields
     test('CREATE student without required field should fail', async () => {
      // student object missing required fields
        const studentMissingRequiredFields = new studentModel({ first_name: 'Frank' });
        let error;
        try {
            // trying to save student to database
            const savedStudentMissingRequiredFields = await studentMissingRequiredFields.save();
            receivedError = savedStudentMissingRequiredFields;
        } catch (receivedError) {
            //catch the error received
            error = receivedError
        }
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
        // Validation error for the missing first_name field is defined
        expect(error.errors.first_name).toBeUndefined();
    });


test("Test READ Operation", async () => {
    try {
      // Insert a sample student into the collection
      let testStudent = { first_name: "Marie", last_name: "Doe", email: "MarieDoe@umass.edu", major: ["Computer Science"], credits: 3, courses_taken:["CS 320"], password: "123abc" };
      await studentsCollection.insertOne(testStudent);
    
      // Find the inserted student by their email
      const findStudent = await studentsCollection.findOne({ email: testStudent.email });
    
      // Check if the retrieved student matches the inserted student
      expect(findStudent.first_name).toBe(testStudent.first_name);
      expect(findStudent.last_name).toBe(testStudent.last_name);
      expect(findStudent.email).toBe(testStudent.email);
      expect(findStudent.major).toEqual(testStudent.major);
      expect(findStudent.credits).toBe(testStudent.credits);
      expect(findStudent.courses_taken).toEqual(testStudent.courses_taken);
    } catch (error) {
      console.error("Test failed with this error:", error);
      throw error; 
    } finally {
      // Close MongoDB connection
      await client.close();
    }
  }, 30000);
  
  test("Test DELETE Operations", async () => {
    let studentsCollection;
    try {
       // Establish MongoDB connection
       await client.connect();
       const db = client.db("classcompass");
       studentsCollection = db.collection("students");

        // Insert a sample student into the collection
        let testStudent = { first_name: "John", last_name: "Doe", email: "johndoe@umass.edu", major: ["Computer Science"], credits: 3, courses_taken:["CS 320","CS 311"], password: "" };
        await studentsCollection.insertOne(testStudent);

        // Delete the student from the collection through their email
        const deleteResult = await studentsCollection.deleteOne({ email: testStudent.email });
        
        // Check if the student is deleted successfully
        expect(deleteResult.deletedCount).toBe(1);
    } catch (error) {
        console.error("Error during DELETE operation:", error);
        throw error;
    }
    finally {
    // Close MongoDB connection
    await client.close();
    }
}, 30000);

  test("Test UPDATE Operations", async () => {
    let studentsCollection;
    try {
        // Establish MongoDB connection
        await client.connect();
        const db = client.db("classcompass");
        studentsCollection = db.collection("students");

        // Insert a sample student into the collection
        let testStudent = { first_name: "John", last_name: "Doe", email: "johndoe@umass.edu", major: ["Computer Science"], credits: 3, courses_taken:["CS 320","CS 311"], password: "" };
        await studentsCollection.insertOne(testStudent);

        // Update the student's information
        const updatedStudent = { first_name: "John", last_name: "Doe", email: "johndoe@umass.edu", major: ["Computer Science"], credits: 6, courses_taken:["CS 320","CS 311", "MATH 235"], password: "" };
        const newResult = await studentsCollection.updateOne({ email: testStudent.email }, { $set: updatedStudent });
        
        // Check if the student is updated successfully
        expect(newResult.modifiedCount).toBe(1);
    } catch (error) {
        console.error("Error during UPDATE operation:", error);
        throw error;
    }
    finally {
        // Close MongoDB connection
        await client.close();
    }
  }, 30000);
});


