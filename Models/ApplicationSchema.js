import mongoose from "mongoose";
import validator from "validator";


const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        minLength:[3,"Name Should be at least 3 Character"],
        maxLength:[25,"Name Cannot exceed 25 character"],
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please enter a Vaild Email"],
        required:[true,"please Enter your Email"]
    },
    coverLetter:{
        type:String,
        required:[true,"please Enter your Cover Letter"]
    },
    phone:{
        type:String,
        required:[true,"please Enter your Phone Number"]
    },
    address:{
        type:String,
        required:[true,"please Enter your Address"]
    },
    resume:
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true

        }
    },

    applicantID:{
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      role:{
        type:String,
        enum:["Job Seeker"],
        required: true
      }
    },

    employerID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
          },
          role:{
            type:String,
            enum:["Employer"],
            required: true
          }
    }
})

export const Application = mongoose.model("Application",applicationSchema)