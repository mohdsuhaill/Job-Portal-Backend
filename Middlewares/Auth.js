import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./Error.js";
import jwt from 'jsonwebtoken';
import { User } from "../Models/UserSchema.js";

export const isAuthorized = catchAsyncError(async(req, res , next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User Not Athorized", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id);

    next();
})