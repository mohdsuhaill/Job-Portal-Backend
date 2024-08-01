import express from "express";
import { isAuthorized } from "../Middlewares/Auth.js";
import { employerGetAllApplication, jobseekerDeleteApplication, jobseekerGetAllApplication, postApplication } from "../Controllers/ApplicationController.js";

const router = express.Router();

router.get("/jobseeker/getall",isAuthorized,jobseekerGetAllApplication)
router.get("/employer/getall",isAuthorized,employerGetAllApplication)
router.delete("/delete/:id",isAuthorized,jobseekerDeleteApplication)
router.post("/post",isAuthorized,postApplication)

export default router;