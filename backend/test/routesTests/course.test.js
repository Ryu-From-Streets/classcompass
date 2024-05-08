require("dotenv").config();
const mongoose = require("mongoose");
const courseInstance = require('../../models/course');

//CRUD Operation Instances
const courseFunctions = {
  async getAllCourses(){
    try{
      const allCourses = await courseInstance.find();
      return allCourses;
    } catch(error){
      console.log('Could not get all courses ${error}')
    }
  },

  //CREATE
  async createCourse(course){
    try{
      const newCourse = {
        code: course.code,
        name: course.name,
        description: course.description,
        instructors: course.instructors,
        credits: course.credits,
        prerequisites: course.prerequisites,
        averageRating: course.averageRating,
        totalRatings: course.totalRatings,
        totalRatingValue: course.totalRatingValue
      };
      const response = await new courseInstance(newCourse).save();
      return response;
    } catch(error){
      console.log(error);
    }
  },

  //READ
  async getCourseByCode(courseCode){
    try{
      const courseResponse = await courseFunctions.findByCode({ code: courseCode})
      return courseResponse.name;
    }catch(error){
      console.log('Unable to find course with code ${courseCode}, received error: ${error}')
      return null;
    }
  },

  //UPDATE
  async updateCourse(course){
    try{
      const updateResponse = await courseInstance.updateOne(
        { code: course.code},
        {$set: course},
        {new: true},
      );
      return updateResponse;
    } catch(error){
      console.log('Unable to update course: ${error}');
    }
  },

  //DELETE
  async deleteCourse(courseCode){
    try{
      const deletedResponse = await courseInstance.findOneAndDelete({ code: courseCode });
      return deletedResponse;
    }catch(error){
      console.log("Unable to delete course: ${error}");
      return null;
    }
  }
}

//Run Tests on CRUD Instances
describe("Tests on course Routes", () => {
  beforeAll(async() => {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  });

  test("Get all courses", async () => {
    const allCourses = await courseFunctions.getAllCourses();

    expect(allCourses).not.toBeNull();
    expect(Array.isArray(allCourses)).toBe(true);
  });
  
  test("Create course", async() => {
    const newCourse = {
        code: "COMPSCI 320",
        name: "Introduction to Software Engineering",
        description: "",
        instructors: ["Yuriy Brun"],
        credits: 4,
        prerequisites: ["COMPSCI 220"],
        averageRating: 3,
        totalRatings: 10,
        totalRatingValue: 20
    }
    const course =  await courseFunctions.createCourse(newCourse);
    expect(course).not.toBeNull();
  });

  test("Update course", async() => {
    const updateCourse = {
        code: "COMPSCI 320",
        name: "Introduction to Software Engineering",
        description: "",
        instructors: ["Marius"], //Update instructor
        credits: 4, 
        prerequisites: ["COMPSCI 220"],
        averageRating: 3,
        totalRatings: 10,
        totalRatingValue: 20
    }
  
    const course = await courseFunctions.updateCourse(updateCourse);
    expect(course).not.toBeNull(); 
    if (course) { 
      expect(course._id).toEqual(updateCourse._id); 
    }
  });
  

  test("Get Course by Code", async () => {
    const courseCode = "COMPSCI 311";

    const course = await courseFunctions.getCourseByCode(courseCode);

    if (course !== null) {
        expect(course.code).toEqual(courseCode); 
      } else {
        expect(course).toBeNull();
      }
  });
  

  test("Delete course by code", async() => {
      const courseCode = "COMPSI 320"
      const course =  await courseFunctions.deleteCourse(courseCode);
      expect(course).toBeNull();
  });

  

  afterAll(async () => {
    try {
      await mongoose.disconnect();
    } catch(error){
        console.log("Disconnect attempt failed:", error);
      } 
  });
});

















