require("dotenv").config();
const mongoose = require("mongoose");
const ratingInstance = require('../../models/rating');

//Create function that act as mock CRUD Operations
const ratingFunctions = {
  async getAllRatings(){
    try{
      //Find and store all ratings in a variable to return
      const allRatings = await ratingInstance.find();
      return allRatings;
    } catch(error){
      console.log('Could not get all ratings ${error}')
    }
  },

  //CREATE rating for a course
  async createRating(rating){
    try{
      // Define newRating using the rating model
      const newRating = {
        studentID: rating.studentID,
        courseID: rating.courseID,
        value: course.value,
        comment: course.comment 
      };
      //Save response into DB and return 
      const response = await new ratingInstance(newRating).save();
      return response;
    } catch(error){
      console.log(error);
    }
  },

  //READ a course's rating using its courseID
  async getRatingByID(courseID){
    try{
      // Find course then return its rating/value
      const ratingResponse = await ratingInstance.findByCode({ courseID: courseID})
      return ratingResponse.value;
    }catch(error){
      console.log('Unable to find rating for ${courseID}, received error: ${error}')
      return null;
    }
  },

  //UPDATE rating of a course using its courseID
  async updateRating(courseID){
    try{
      const updateResponse = await ratingInstance.updateOne(
        {courseID: courseID},
        {$set: courseID},
        {new: true},
      );
      return updateResponse;
    } catch(error){
      console.log('Unable to update course rating: ${error}');
    }
  },

  //DELETE rating using courseID
  async deleteRating(courseID){
    try{
      const deletedResponse = await ratingInstance.findOneAndDelete({ courseID: courseID });
      return deletedResponse;
    }catch(error){
      console.log("Unable to delete course rating: ${error}");
      return null;
    }
  }
}

//Run Tests on CRUD Instances
describe("Tests on course Routes", () => {
  // Establish a connection to the database
  beforeAll(async() => {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  });
  
  test("Get all ratings", async() => {
    const allRatings = await ratingFunctions.getAllRatings();
    expect(allRatings).not.toBeNull();
    expect(Array.isArray(allRatings)).toBe(true);
  }
  );

  test("Create rating", async() => {
    const newRating = {
        studentID: "662eda8e9c9224394c38ef38",
        courseID: "66206f33aef7621c37da46ed",
        value: 4,
        comment: ""
    }
    const rating =  await ratingFunctions.createRating(newRating);
    expect(rating).not.toBeNull();
  });

  test("Update rating", async() => {
    const updateRating = {
        studentID: "662eda8e9c9224394c38ef38",
        courseID: "66206f33aef7621c37da46ed",
        value: 5, //update value
        comment: ""
    }
  
    const rating = await ratingFunctions.updateRating(updateRating);
    expect(rating).not.toBeNull(); 
    if (rating) { 
      expect(rating).toEqual(rating); 
    }
  });
  

  test("Get rating by courseID", async () => {
    const courseID = "66206f33aef7621c37da46ed";

    const course = await ratingFunctions.getRatingByID(courseID);

    if (course !== null) {
        expect(course.value).not.toBeNull(); 
      } else {
        expect(course).toBeNull();
      }
  });
  

  test("Delete rating by courseID", async() => {
      const courseID = "66206f33aef7621c37da46ed";
      const course =  await ratingFunctions.deleteRating(courseID);
      
      if (course !== null){
        expect(course.value).not.toBeNull();
      } else{
        expect(course).toBeNull();
      }
  });

  

  afterAll(async () => {
    try {
      await mongoose.disconnect();
    } catch(error){
        console.log("Disconnect attempt failed:", error);
      } 
  });
});
