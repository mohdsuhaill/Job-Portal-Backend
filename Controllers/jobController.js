import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/Error.js";
import { Job } from "../Models/jobSchema.js";


export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expried: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker Is not Allowed to acess this resoureces !",
        400
      )
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("please enter All the Job deatils", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("please Either Fixed salary or ranged salary")
    );
  }
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed Salary and ranged salary together")
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy
  });
   
  res.status(200).json({
    success: true,
    message: "Job Created Successfully",
    job
  })



});

export const getmyjobs = catchAsyncError(async(req,res,next)=>{
    const {role}= req.user;
    if (role === "Job Seeker") {
        return next(
          new ErrorHandler(
            "Job Seeker Is not Allowed to acess this resoureces !",
            400
          )
        );
      }

    const myjobs = await Job.find({postedBy: req.user._id});
    res.status(200).json({
        success:true,
        myjobs,
    })
    
})

export const editJob = catchAsyncError(async(req,res,next)=>{
    const {role}= req.user;
    if (role === "Job Seeker") {
        return next(
          new ErrorHandler(
            "Job Seeker Is not Allowed to acess this resoureces !",
            400
          )
        );
      }
    const {id} = req.params;  
    let job = await Job.findById(id);
    if(!job){
        return next(
            new ErrorHandler(
              " opps , Job Not Found",
              404
            )
          );
    }
    job = await Job.findByIdAndUpdate(id ,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:"job Updated Successfully",
        job,
        
    })
})


export const deleteJob = catchAsyncError(async(req,res,next)=>{
    const {role}= req.user;
    if (role === "Job Seeker") {
        return next(
          new ErrorHandler(
            "Job Seeker Is not Allowed to acess this resoureces !",
            400
          )
        );
      }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(
            new ErrorHandler(
              " opps , Job Not Found",
              404
            )
          );
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"Job deleted Successfully"
    });
})