import mongoose from "mongoose";

// function to connect to the mongodb database
export const connectDB = async () => {
    try{

        // mongoose.connect.on('connected', ()=> console.log('Database Connected'));
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/F-ping`)
        
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        process.exit(1);
    }
}