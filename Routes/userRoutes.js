import express from "express";
import { getUser, login, logout, register } from "../Controllers/userControllers.js";
import { isAuthorized } from "../Middlewares/Auth.js";



const router = express.Router();

router.post("/register", register)
router.post("/login",login)
router.get("/logout",isAuthorized,logout)
router.get("/getuser",isAuthorized,getUser)



export default router;