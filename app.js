// Import part 
// app.js using for clear view 
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./Routes/userRoutes.js";
import ApplicationRouter from "./Routes/ApplicationRouter.js";
import JobRouter from "./Routes/JobRouter.js";
import {dbConnection} from './Database/DBConnection.js'
import {errorMiddleware} from './Middlewares/Error.js'




const app = express();


dotenv.config({path:"./Config/Config.env"});

app.use(cors({
    origin:[process.env.FROUNTEND_URL],
    methods:['GET','POST','DELETE','PUT'],
    credentials:true,
}));



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());





app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/",
}))


//  routers path 
app.use('/api/user',userRouter)
app.use('/api/app',ApplicationRouter)
app.use('/api/job',JobRouter)

// db connection 
dbConnection();




app.use(errorMiddleware);


export default app;