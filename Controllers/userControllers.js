import {catchAsyncError} from '../Middlewares/catchAsyncError.js'
import ErrorHandler, { errorMiddleware } from '../Middlewares/Error.js';
import { User } from '../Models/UserSchema.js';
import { sendToken } from '../Utils/jwtToken.js'


//  Register user Part 
export const register  = catchAsyncError (async(req ,res, next)=>{
    const {name,email,phone,role,password} = req.body;
     if(!name||!email||!phone||!role||!password){
        return next(new ErrorHandler ("Please fill full registration form!... "))
     }

     const isEmail = await User.findOne({email});
     if(isEmail){
        return next(new ErrorHandler ("Email Already Existed"))  
     }
     const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
     })
    sendToken(user,200, res,"user Regisetered Successfully")
})

//  User Login Part 
export const login = catchAsyncError(async(req,res,next)=>{
    const {email ,password, role} = req.body;
    if(!email || !password || !role){
    return next (new ErrorHandler("please Enter your Email, password and role",400))
}
    const user = await User.findOne({email}).select("+password");
    //  user Not found 
    if(!user){
        return next  (new ErrorHandler("Invalid Email ID ",400))
    }
    const isPasswordMatched = await user.ComparePassword(password);
    // password Not Match 
    if(!isPasswordMatched){
        return next (new ErrorHandler("Please Enter Your vaild Password",400)) 
    }
    // user Not Found 
    if(user.role !== role){
        return next (new ErrorHandler(" user Not Found within this Role",400)) 
    }
    sendToken(user,200,res, "user Login sucessfully")
})

export const logout = catchAsyncError(async (req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message:"user Logout Successfully"
    })
})


export const getUser = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    })
})