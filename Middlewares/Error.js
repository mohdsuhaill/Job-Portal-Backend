//  for Error Handling 

class ErrorHandler extends Error {
   constructor (message, statusCode){
      super(message);
      this.statusCode = statusCode;
   }

}

export const errorMiddleware = (err,req,res, next)=>{
    err.message = err.message || "Internal server Error",
    err.statusCode= err.statusCode || 500;

    if(err.name === "CaseError"){

        const message = `invaild... Resource not Found ${err.path}`
        err = new ErrorHandler (message,400)

    }
    if(err.code === 11000){

        const message = `Duplicate Id ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler (message,400)

    }
    if(err.name === "JsonWebTokenError"){

        const message = `JSON Web Token is Not Valid ... please Try agian After Some time `
        err = new ErrorHandler (message,400)

    }
    if(err.name === "TokenExpriedError"){

        const message = `Json Web Token is Expired ...please Try agian After Some time `
        err = new ErrorHandler (message,400)

    }
      
     return res.status(err.statusCode).json({
        success :false,
        message : err.message,
     })
}

export default ErrorHandler;