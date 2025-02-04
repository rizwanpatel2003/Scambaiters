import mongoose from "mongoose";


export const connectDB= async function() {
    try {
       const response= await mongoose.connect(process.env.MONGODB_URI!);
          console.log(response.connection.port)
          console.log("database connection success full")
    } catch (error) {
        console.log("Database connection failed",error)
        process.exit(1)
    }
}