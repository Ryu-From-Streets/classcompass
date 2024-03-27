import exp from "constants";
import { MongoClient, ServerApiVersion } from "mongodb";
// Replace the placeholder with your Atlas connection string
const uri =
  "mongodb+srv://ClassCompass:ClassCompass123@cluster0.v2vplda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DATABASE_NAME = "class_compass";
const COLLECTION_NAME = "courses";

var client, db, collection;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );

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

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     const db = client.db(DATABASE_NAME);
//     const collection = db.collection(COLLECTION_NAME);
//     console.log("You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

async function insertCourse() {
  try {
    const newDoc = {
      name: "John Smith",
      start: "10:00",
      end: "11:15",
    };
    var foundDoc = await collection.find(newDoc);
    if (foundDoc == null) {
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
    const newDoc = {
      name: "John Smith",
      start: "10:00",
      end: "11:15",
    };
    var foundDoc = await collection.find(newDoc);
    if (foundDoc != null) {
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

export{getAll, insertCourse, initialize}