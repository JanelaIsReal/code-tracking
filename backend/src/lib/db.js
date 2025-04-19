import mongoose from "mongoose";

export const connectDB = async () => { 
    try {        
        const conn =  await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.log("Database connection failed");
        process.exit(1); //1 e false 0 e true
    }
}   