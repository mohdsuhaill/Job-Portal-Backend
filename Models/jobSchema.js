import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please Enter Your Job title"],
    minLength: [3, "Job Title should be least 3 characters"],
    maxLength: [52, "Job title Maximum Length 52 characters "],
  },
  description: {
    type: String,
    required: [true, "please Enter Your Job description"],
    minLength: [50, "Job descripition should be least 50 characters"],
    maxLength: [350, "Job description Maximum Length 350 characters "],
  },
  category: {
    type: String,
    required: [true, "job catogory is requried !"],
  },
  country: {
    type: String,
    required: [true, "job country is requried !"],
  },
  city: {
    type: String,
    required: [true, "job city is requried !"],
  },
  location: {
    type: String,
    required: [true, "please enter Your Exact Loaction"],
    minLength: [25, "job Location should be 25 characters"],
  },
  fixedSalary:{
    type: Number,
    minLength:[5,"fixed salary must Contain at Least 5 digits"],
    maxLength:[9,"fixed salary cannot exceed 9 digits "]
  },
  salaryFrom:{
    type: Number,
    minLength:[4,"salary from must Contain at Least 4 digits"],
    maxLength:[9,"salary from  cannot exceed 9 digits "]
  },
  salaryTo:{
    type: Number,
    minLength:[4,"salary to  must Contain at Least 4 digits"],
    maxLength:[9,"salary to  cannot exceed 9 digits "]
  },
  expried:{
    type:Boolean,
    default: false
  },
  jobPostDate:{
    type: Date,
    default: Date.now,
  },
  postedBy:{
    type: mongoose.Schema.ObjectId,
    ref:"User",
    required: true,
  }
});

export const Job = mongoose.model("Job",jobSchema)
