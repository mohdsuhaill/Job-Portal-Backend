import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    minLength: [3, "you should contain at least 3 Characters "],
    maxLength: [32, "Name cannot Exceed 32 Characters "],
  },
  email: {
    type: String,
    required: [true, "please Enter your Email"],
    validate: [validator.isEmail,"please enter a valid Email"]
  },
  phone: {
    type: Number,
    required: [true, "please Enter Your Phone Number"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password "],
    minLength: [8, "you should contain at least 8 Characters "],
    maxLength: [32, "Name cannot Exceed 32 Characters "],
    select: false
  },
  role: {
    type: String,
    required: [true, "please Provide Your Role"],
    ename: ["Job Seeker", "Employer"],
  },
  createAdmin: {
    type: Date,
    default: Date.now,
  },
});

// Password Hasing

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//  Password Comparing

UserSchema.methods.ComparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

// Generating a Jwt Token For Authorization

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};



export const User = mongoose.model("User",UserSchema);
 