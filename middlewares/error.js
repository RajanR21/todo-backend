
class ErrorHandler extends Error {

    //this class has been extended form Error class
    // hence we need to take message form it and for that 
    //we have to use super() which refers to parant class constructor
    constructor(message , statuscode){
        super(message);
        this.statuscode = statuscode;
    }
} 

export const errorMiddleware = (err , req , res , next) => {

    if(err.message == "")err.message = "Internal Server Error"
    
    err.statuscode = err.statuscode || 500;

         return res.status(err.statuscode).json({
            success : false , 
            message : err.message,
         })
}


export default ErrorHandler;