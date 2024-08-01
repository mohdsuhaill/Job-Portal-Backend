import mongoose from "mongoose";


// conneting DB 
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "MERN_JOB_SEEKING_WEBSIT",
    })
    .then(() => {
      console.log("Database Connected Sucessfully");
    })
    .catch(() => {
      console.log(`Database Not Connected Sucessfully: ${Err} `);
    });
};
