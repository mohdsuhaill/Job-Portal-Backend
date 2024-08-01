import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/Error.js";
import { Application } from "../Models/ApplicationSchema.js";
import cloudinary from "cloudinary"
import { Job } from "../Models/jobSchema.js";

export const employerGetAllApplication = catchAsyncError(async(req,res,next)=>{
    const {role}= req.user;
    if (role === "Job Seeker") {
        return next(
          new ErrorHandler(
            "Job Seeker Is not Allowed to acess this resoureces !",
            400
          )
        );
      }

     const {_id}= req.user;
     const applications = await Application.find({"employerID.user": _id});

     res.status(200).json({
        success: true,
        applications
     })
})

export const jobseekerGetAllApplication = catchAsyncError(async(req,res,next)=>{
    const {role}= req.user;
    if (role === "Employer") {
        return next(
          new ErrorHandler(
            "Employer Is not Allowed to acess this resoureces !",
            400
          )
        );
      }

     const {_id}= req.user;
     const applications = await Application.find({"applicantID.user": _id});

     res.status(200).json({
        success: true,
        applications
     })
})


export const jobseekerDeleteApplication = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if (role === "Employer") {
       
        return next(
          new ErrorHandler(
            "Employer Is not Allowed to acess this resoureces !",
            400
          )
        );
      }
      const {id} = req.params;
      const application = await Application.findById(id);
      if (!application){
        return next (new ErrorHandler ("oops, application Not Found",404))
      }
      await application.deleteOne();
      res.status(200).json({
        success: true,
        message: " Application Deleted Sucessfully"
      })
})

export const postApplication = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if (role === "Employer") {
       
        return next(
          new ErrorHandler(
            "Employer Is not Allowed to acess this resoureces !",
            400
          )
        );
      }
      if(!req.files || Object.keys(req.files).length === 0){
        return next (new ErrorHandler("resume File Required "));
      }
      const {resume} = req.files;
      const allowedFormats = ["image/PNG", "image/JPG", "image/webp"];
      if(!allowedFormats.includes(resume.mimetype)){
        return next (new ErrorHandler("Invalid File types . Please Upload Your resume in png,jpg or webp Format.",400))
      }
    
    const cloudinaryResponse = await cloudinary.Uploader.upload(
        resume.tempFilePath
    );
    // console.log(cloudinaryResponse);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloundinary Error:",cloudinaryResponse.error || "unknow cloundinary Error");
        return next (new ErrorHandler("Failed to upload resume ",500))
    }
    const {name,email,coverLetter,phone,address,jobId}= req.body;
    const applicantID= {
        user:req.user._id,
        role:"Job Seeker"
    }
    if(!jobId){
        return next(new ErrorHandler("Job Not Found",404))
    }
    const jobDetails = await Job.findById(jobId);
    if(!jobDetails){
        return next (new ErrorHandler("job Not Found",404))
    }

    const employerID={
        user:jobDetails.postedBy,
        role:"Employer",
    }
    if(!name || !email || !coverLetter || !phone || !address || !applicantID || employerID || !resume ){

        return next (new ErrorHandler("Please Fill All field",400))
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume:{
            public_id:cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }

    })

    res.status(200).json({
        success:true,
        message: "Appliaction Submited",
        application,
    })
})