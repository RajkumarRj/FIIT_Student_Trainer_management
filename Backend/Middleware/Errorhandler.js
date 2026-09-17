

export const ErrorHandler  = (err,req,res,next)=>{

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";


    console.error(`${statusCode} - ${message} `, err.stack);

    res.status(statusCode).json({
        success:false,
        status:statusCode,
        message,

    })
    
}



export class Apperror extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}


