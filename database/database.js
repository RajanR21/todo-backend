import mongoose from "mongoose"


export const connectDB = ()=>{
     
mongoose.connect( process.env.mongoUrl, {
    dbname : "backendapi",
})
.then(() => console.log("conncected"))
.catch((e) => console.log(e));

}
