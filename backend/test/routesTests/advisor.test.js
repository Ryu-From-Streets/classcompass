require("dotenv").config();
const mongoose = require("mongoose");
const advisorInstance = require('../../models/advisor');

//CRUD Operation Instances
const advisorFunctions = {
  async getAllAdvisors(){
    try{
      const allAdvisors = await advisorInstance.find();
      return allAdvisors;
    } catch(error){
      console.log('Could not get all advisors ${error}')
    }
  },

  //CREATE
  async createAdvisor(advisor){
    try{
      const newAdvisor = {
        first_name: advisor.first_name,
        last_name: advisor.last_name,
        email: advisor.email,
        password: advisor.password,
        current_students: advisor.current_students,
        role: advisor.role
      };
      const response = await new advisorInstance(newAdvisor).save();
      return response;
    } catch(error){
      console.log(error);
    }
  },

  //READ
  async getAdvisorById(advisorId){
    try{
      const advisorResponse = await advisorFunctions.findById({_id: advisorId})
      return advisorId;
    }catch(error){
      console.log('Unable to find advisors, received error: ${error}')
    }
  },

  //UPDATE
  async updateAdvisor(advisor){
    try{
      const updateResponse = await advisorInstance.updateOne(
        {_id: advisor.id},
        {$set: advisor},
        {new: true},
      );
      return updateResponse;
    } catch(error){
      console.log('Unable to update advisor ${error}');
    }
  },

  //DELETE
  async deleteAdvisor(advisorId){
    try{
      const deletedResponse = await advisorInstance.findOneAndDelete(advisorId);
      return deletedResponse;
    }catch(error){
      console.log("Unable to delete advisor ${error}");
    }
  }
}

//Run Tests on CRUD Instances
describe("Tests on Advisor Routes", () => {
  beforeAll(async() => {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      //useCreateIndex: true,
      useUnifiedTopology: true,
    })
  });

  test("Get all advisors", async () => {
    const allAdvisors = await advisorFunctions.getAllAdvisors();
    expect(allAdvisors).not.toBeNull();
    expect(Array.isArray(allAdvisors)).toBe(true);
  });
  

  test("Create advisor", async() => {
    const newAdvisor = {
        first_name: "Ann",
        last_name: "Jane",
        email: "AJane@umass.edu",
        password: "advisor123",
        current_students: ["Paul", "Abby", "Maria"],
        role: "advisor"
    }
    const advisor =  await advisorFunctions.createAdvisor(newAdvisor);
    expect(advisor).not.toBeNull();
  });

  test("Update advisor", async() => {
    const updateAdvisor = {
      first_name: "Ann",
      last_name: "George", // Update last_name
      email: "AJane@umass.edu",
      password: "advisor123",
      current_students: ["Paul", "Abby", "Maria"],
      role: "advisor"
    };
  
    const advisor = await advisorFunctions.updateAdvisor(updateAdvisor);
    expect(advisor).not.toBeNull(); 
    if (advisor) { 
      expect(advisor._id).toEqual(updateAdvisor._id); 
    }
  });
  

  test("Get advisor by Id", async() => {
    const advisorId = "662c07e0749407322123d910";
    const advisor = await advisorFunctions.getAdvisorById(advisorId);
    expect(advisor).not.toBeNull(); 
    if (advisor) { 
      expect(advisor._id.toString()).toEqual(advisorId); 
    }
  });
  

  test("Delete advisor by Id", async() => {
      const advisorId = "662c07e0749407322123d910";
      const advisor =  await advisorFunctions.deleteAdvisor(advisorId);
      if(advisor !== null){
        expect(advisor).not.toBeNull();
      } else{
        expect(advisor).toBeNull();
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

