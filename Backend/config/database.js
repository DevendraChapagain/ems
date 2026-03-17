import mongoose from "mongoose";

const connectDB = async (MONGO_URL) => {
    console.log("Connecting to MongoDB...");
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;