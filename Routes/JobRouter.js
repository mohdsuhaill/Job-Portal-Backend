import express from "express";
import { deleteJob, editJob, getAllJobs, getmyjobs, postJob } from "../Controllers/jobController.js";
import { isAuthorized } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/getall",getAllJobs);
router.post("/postjob",isAuthorized,postJob);
router.get("/getmyjobs",isAuthorized,getmyjobs);
router.put("/update/:id",isAuthorized,editJob);
router.delete("/delete/:id",isAuthorized,deleteJob)

export default router;