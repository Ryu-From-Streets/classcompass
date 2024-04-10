const { MongoClient, ServerApiVersion } = require( "mongodb");
// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://ClassCompass:ClassCompass123@cluster0.v2vplda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DATABASE_NAME = "class_compass";
const COURSE_COLLECTION = "courses";
const STUDENT_COLLECTION = "students";

let client, db, courseCollection, studentCollection;

async function initialize() {
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    db = client.db(DATABASE_NAME);
    courseCollection = db.collection(COURSE_COLLECTION);
    studentCollection = db.collection(STUDENT_COLLECTION);

    console.log("Success connection to MongoDB");
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  }
}

async function newStudent(first, last, gmail, credits, courses, password) {
  try {
    const newStudent = {first_name: first, last_name: last, email: gmail, credits: credits, course_taken: courses, password: password};
    if (await studentCollection.findOne({email: gmail})) {
      console.log("Student account already exist");
    }
    else {
      await studentCollection.insertOne(newStudent);
    }
  } catch (err) {
    console.error("Error creating new student account:", err);
  }
}

async function insertCourse() {
  try {
    if (!courseCollection) {
      throw new Error("Collection is not initialized. Call initialize first.");
    }

    const newDoc = { name: "John Smith", start: "10:00", end: "11:15" };
    var foundDoc = await courseCollection.findOne(newDoc);
    if (!foundDoc) {
      await courseCollection.insertOne(newDoc);
      console.log("Successful insert");
    } 
    else {
      console.log("Document already exist");
    }
  } catch (err) {
    console.error("Error inserting document:", err);
    throw err;
  }
}

async function deleteCourse() {
  try {
    if (!courseCollection) {
      throw new Error("Collection is not initialized. Call initialize first.");
    }
    
    const newDoc = { name: "John Smith", start: "10:00", end: "11:15" };
    var foundDoc = await courseCollection.findOne(newDoc);
    if (foundDoc) {
      await courseCollection.deleteOne(newDoc);
      console.log("Successful delete");
    } 
    else {
      console.log("Document does not exist");
    }
  } catch (err) {
    console.error("Error deleting document:", err);
    throw err;
  }
}

async function getCourse(courseName) {
  try {
    if (!courseCollection) {
      throw new Error("Collection is not initialized. Call initialize first.");
    }

    var foundDoc = await courseCollection.find({name: courseName}); 
    if (foundDoc) {
      console.log("Successful found course");
      return foundDoc.toArray();
    } 
    else {
      console.log("Document does not exist");
    }
  } catch (err) {
    console.error("Error finding document:", err);
    throw err;
  }
}

async function getAll() {
  try {
    if (!courseCollection) {
      throw new Error("Collection is not initialized. Call initialize first.");
    }
    const documents = await courseCollection.find().toArray();
    console.log("Successfully got all documents")
    return documents;
  } catch (err) {
    console.error("Error fetching documents:", err);
    throw err;
  }
}

module.exports = { getAll, insertCourse, deleteCourse, initialize };