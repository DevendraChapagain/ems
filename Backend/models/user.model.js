import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"User name is required"],
        unique: [true,"User name must be unique"],
    },
    email: { 
        type : String,
        required: [true,"Email is required"],
        unique: [true,"Email must be unique"],
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
});


const User = mongoose.model("User", userSchema);
export default User;