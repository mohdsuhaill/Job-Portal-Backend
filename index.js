import app from "./app.js";
import cloudinary from "cloudinary"  

cloudinary.v2.config({
    cloud_name:process.env.CLOUNDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET
})






app.listen(process.env.PORT, ()=>{
    console.log(`App is running in the port ${process.env.PORT}`);
})