const { MongoClient, ServerApiVersion } = require( "mongodb");
// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://ClassCompass:ClassCompass123@cluster0.v2vplda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DATABASE_NAME = "class_compass";
const COLLECTION_NAME = "courses";

let client, db, collection;

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
    collection = db.collection(COLLECTION_NAME);

    console.log("Success connection to MongoDB");
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  }
}

async function insertCourse() {
  try {
    if (!collection) {
      throw new Error("Collection is not initialized. Call initialize first.");
    }

    const newDoc = { name: "John Smith", start: "10:00", end: "11:15" };
    var foundDoc = await collection.findOne(newDoc);
    if (!foundDoc) {
      await collection.insertOne(newDoc);
      console.log("Successful insert");
    } else {
      console.log("Document already exist");
    }
  } catch (err) {
    console.error("Error inserting document:", err);
    throw err;
  }
}

async function deleteCourse() {
  try {
    if (!collection) {
      throw new Error("Collection is not initialized. Call initialize first.");
    }
    
    const newDoc = { name: "John Smith", start: "10:00", end: "11:15" };
    var foundDoc = await collection.findOne(newDoc);
    if (foundDoc) {
      await collection.deleteOne(newDoc);
      console.log("Successful delete");
    } else {
      console.log("Document does not exist");
    }
  } catch (err) {
    console.error("Error deleting document:", err);
    throw err;
  }
}

async function getAll() {
  try {
    if (!collection) {
      throw new Error("Collection is not initialized. Call initialize first.");
    }
    const documents = await collection.find().toArray();
    return documents;
  } catch (err) {
    console.error("Error fetching documents:", err);
    throw err;
  }
}

module.exports = { getAll, insertCourse, deleteCourse, initialize };